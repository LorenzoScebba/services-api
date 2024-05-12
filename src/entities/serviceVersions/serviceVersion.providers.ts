import { DataSource } from 'typeorm';
import { CONSTANTS } from '../../constants';
import { ServiceVersion } from './serviceVersion.entity';

export const serviceVersionProviders = [
  {
    provide: CONSTANTS.SERVICE_VERSION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ServiceVersion),
    inject: [CONSTANTS.DATA_SOURCE],
  },
];
