import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CONSTANTS } from '../../constants';
import { ServiceVersion, ServiceVersionBase } from './serviceVersion.entity';
import { Service } from '../services/service.entity';

@Injectable()
export class ServiceVersionService {
  constructor(
    @Inject(CONSTANTS.SERVICE_REPOSITORY)
    private serviceRepository: Repository<Service>,
    @Inject(CONSTANTS.SERVICE_VERSION_REPOSITORY)
    private serviceVersionRepository: Repository<ServiceVersion>,
  ) {}

  async create(
    id: string,
    serviceVersionBase: ServiceVersionBase,
  ): Promise<ServiceVersion> {
    const serviceVersion = new ServiceVersion();
    serviceVersion.service = await this.serviceRepository.findOneBy({ id });
    serviceVersion.version = serviceVersionBase.version;

    return await this.serviceVersionRepository.save(serviceVersion);
  }

  async findByServiceId(serviceId: string) {
    return await this.serviceVersionRepository.find({
      where: {
        service: {
          id: serviceId,
        },
      },
    });
  }

  async delete(serviceId: string) {
    await this.serviceVersionRepository.delete({
      id: serviceId,
    });
  }
}
