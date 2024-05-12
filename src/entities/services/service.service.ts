import { Inject, Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { Service, ServiceBase } from './service.entity';
import { CONSTANTS } from '../../constants';
import { SortBy } from '../../requests/models/SortBy';
import { FilterBy } from '../../requests/models/FilterBy';
import { set } from 'lodash';

@Injectable()
export class ServiceService {
  constructor(
    @Inject(CONSTANTS.SERVICE_REPOSITORY)
    private serviceRepository: Repository<Service>,
  ) {}

  async find(
    skip: number,
    take: number,
    filterBy?: FilterBy[],
    sortBy?: SortBy[],
  ): Promise<Service[]> {
    const where = {};
    filterBy?.forEach((f) => {
      set(where, f.field, ILike(`%${f.value}%`));
    });

    const order = {};
    sortBy?.forEach((s) => {
      order[s.field] = s.direction;
    });

    return this.serviceRepository.find({
      skip,
      take,
      where,
      order,
    });
  }

  async count(filterBy: FilterBy[]) {
    const where = {};
    filterBy?.map((f) => {
      set(where, f.field, ILike(`%${f.value}%`));
    });

    return await this.serviceRepository.count({
      where,
    });
  }

  async findById(id: string): Promise<Service> {
    return this.serviceRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(service: ServiceBase): Promise<Service> {
    const newService = new Service();
    newService.name = service.name;
    newService.description = service.description;

    return await this.serviceRepository.save(newService, {});
  }

  async delete(serviceId: string) {
    await this.serviceRepository.delete({
      id: serviceId,
    });
  }
}
