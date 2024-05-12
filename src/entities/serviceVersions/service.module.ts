import { Module } from '@nestjs/common';
import { ServiceVersionService } from './serviceVersion.service';
import { serviceVersionProviders } from './serviceVersion.providers';
import { DatabaseModule } from '../../database.module';
import { serviceProviders } from '../services/service.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...serviceVersionProviders,
    ...serviceProviders,
    ServiceVersionService,
  ],
  exports: [ServiceVersionService],
})
export class ServiceVersionModule {}
