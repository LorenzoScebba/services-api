import { Module } from '@nestjs/common';
import { serviceProviders } from './service.providers';
import { ServiceService } from './service.service';
import { DatabaseModule } from '../../database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...serviceProviders, ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
