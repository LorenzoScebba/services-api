import { DataSource } from 'typeorm';
import { Service } from './service.entity';
import { CONSTANTS } from '../../constants';

export const serviceProviders = [
  {
    provide: CONSTANTS.SERVICE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Service),
    inject: [CONSTANTS.DATA_SOURCE],
  },
];
