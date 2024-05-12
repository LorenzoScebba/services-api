import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ServiceService } from './entities/services/service.service';
import { Service, ServiceBase } from './entities/services/service.entity';
import { PaginatedResponse } from './responses/paginatedResponse';
import {
  ServiceVersion,
  ServiceVersionBase,
} from './entities/serviceVersions/serviceVersion.entity';
import { ServiceVersionService } from './entities/serviceVersions/serviceVersion.service';
import { SortingFieldOrderPipe } from './requests/pipes/SortingFieldOrder.pipe';
import { SortBy } from './requests/models/SortBy';
import { FilterByPipe } from './requests/pipes/FilterBy.pipe';
import { FilterBy } from './requests/models/FilterBy';
import { EntityPropertyNotFoundError } from 'typeorm';
import { AuthGuard } from './auth/auth.guard';
import { Response } from 'express';
import { Roles } from './auth/roles.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly serviceService: ServiceService,
    private readonly serviceVersionService: ServiceVersionService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/api/services')
  @Roles(['reader', 'admin'])
  async getServices(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(50), ParseIntPipe) take: number,
    @Query('filterBy', new FilterByPipe()) filterBy: FilterBy[],
    @Query('sortBy', new SortingFieldOrderPipe()) sortBy?: SortBy[],
  ): Promise<PaginatedResponse<Service[]>> {
    try {
      const data = await this.serviceService.find(skip, take, filterBy, sortBy);
      const totalData = await this.serviceService.count(filterBy);
      return {
        data,
        pagination: {
          take,
          skip,
          totalData,
        },
      } as PaginatedResponse<Service[]>;
    } catch (err) {
      if (err instanceof EntityPropertyNotFoundError) {
        throw new BadRequestException(
          'You provided an invalid property name, please check the filtersBy and sortBy query params.',
        );
      } else {
        throw err;
      }
    }
  }

  @UseGuards(AuthGuard)
  @Get('/api/services/:id')
  @Roles(['reader', 'admin'])
  async getService(
    @Param('id', ParseUUIDPipe) serviceId: string,
  ): Promise<Service> {
    const found = await this.serviceService.findById(serviceId);
    if (!found)
      throw new NotFoundException('The requested service does not exists');
    return found;
  }

  @UseGuards(AuthGuard)
  @Get('/api/services/:id/versions')
  @Roles(['reader', 'admin'])
  async getServiceVersions(
    @Param('id', ParseUUIDPipe) serviceId: string,
  ): Promise<ServiceVersion[]> {
    const found = await this.serviceService.findById(serviceId);
    if (!found)
      throw new NotFoundException('The requested service does not exist');

    return await this.serviceVersionService.findByServiceId(serviceId);
  }

  @UseGuards(AuthGuard)
  @Post('/api/services')
  @Roles(['admin'])
  @HttpCode(201)
  async createService(
    @Body() serviceBase: ServiceBase,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Service> {
    const service = await this.serviceService.create(serviceBase);
    response.setHeader('Location', `/api/services/${service.id}`);
    return service;
  }

  @UseGuards(AuthGuard)
  @Delete('/api/services/:id')
  @Roles(['admin'])
  @HttpCode(204)
  async deleteService(
    @Param('id', ParseUUIDPipe) serviceId: string,
  ): Promise<void> {
    await this.serviceVersionService.delete(serviceId);
    await this.serviceService.delete(serviceId);
  }

  @UseGuards(AuthGuard)
  @Post('/api/services/:id/version')
  @Roles(['admin'])
  @HttpCode(201)
  async createServiceVersion(
    @Param('id', ParseUUIDPipe) serviceId: string,
    @Body() serviceVersionBase: ServiceVersionBase,
  ): Promise<ServiceVersion> {
    const found = await this.serviceService.findById(serviceId);
    if (!found)
      throw new BadRequestException('The requested service does not exist');

    return await this.serviceVersionService.create(
      serviceId,
      serviceVersionBase,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('/api/services/:id/version/:versionId')
  @Roles(['admin'])
  @HttpCode(204)
  async deleteServiceVersion(
    @Param('versionId', ParseUUIDPipe) serviceVersionId: string,
  ): Promise<void> {
    await this.serviceVersionService.delete(serviceVersionId);
  }
}
