import { DataSource } from 'typeorm';
import { CONSTANTS } from './constants';
import { Service } from './entities/services/service.entity';
import { ServiceVersion } from './entities/serviceVersions/serviceVersion.entity';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: CONSTANTS.DATA_SOURCE,
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get<string>('PG_HOST'),
        port: 5432,
        username: configService.get<string>('PG_PWD'),
        password: configService.get<string>('PG_USER'),
        database: configService.get<string>('PG_DATABASE'),
        entities: [Service, ServiceVersion],
        synchronize: true,
      });

      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
