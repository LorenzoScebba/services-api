import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServiceModule } from './entities/services/service.module';
import { ServiceVersionModule } from './entities/serviceVersions/service.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ServiceModule,
    ServiceVersionModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
