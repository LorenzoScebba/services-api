import { AppController } from './app.controller';
import { ServiceService } from './entities/services/service.service';
import { ServiceVersionService } from './entities/serviceVersions/serviceVersion.service';
import { Repository } from 'typeorm';
import { Service } from './entities/services/service.entity';
import { ServiceVersion } from './entities/serviceVersions/serviceVersion.entity';
import {
  serviceFactory,
  throwEntityPropertyNotFoundError,
} from './utils/testUtils';
import { BadRequestException } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;

  let serviceService: ServiceService;
  let serviceVersionService: ServiceVersionService;

  let serviceRepository: Repository<Service>;
  let serviceVersionRepository: Repository<ServiceVersion>;

  beforeEach(() => {
    serviceService = new ServiceService(serviceRepository);
    serviceVersionService = new ServiceVersionService(
      serviceRepository,
      serviceVersionRepository,
    );
    appController = new AppController(serviceService, serviceVersionService);
  });

  describe('GET /api/services', () => {
    it('should return 400 if an invalid property name is passed', async () => {
      jest
        .spyOn(serviceService, 'find')
        .mockImplementation(throwEntityPropertyNotFoundError);

      await expect(
        appController.getServices(0, 50, [], []),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
    it('should return an empty list of data if no data is found', async () => {
      jest.spyOn(serviceService, 'find').mockResolvedValueOnce([]);
      jest.spyOn(serviceService, 'count').mockResolvedValueOnce(0);

      const result = await appController.getServices(0, 50, [], []);
      expect(result.data).toHaveLength(0);
    });
    it('should return the correct pagination information', async () => {
      jest
        .spyOn(serviceService, 'find')
        .mockResolvedValueOnce(new Array(50).fill(serviceFactory()));
      jest.spyOn(serviceService, 'count').mockResolvedValueOnce(200);

      const result = await appController.getServices(0, 50, [], []);
      expect(result.pagination.take).toEqual(50);
      expect(result.pagination.skip).toEqual(0);
      expect(result.pagination.totalData).toEqual(200);
    });
    it('should return the data correctly', async () => {
      const data: Service[] = new Array(50).fill(serviceFactory());
      jest.spyOn(serviceService, 'find').mockResolvedValueOnce(data);
      jest.spyOn(serviceService, 'count').mockResolvedValueOnce(200);

      const result = await appController.getServices(0, 50, [], []);
      expect(result.data).toStrictEqual(data);
    });
  });

  // Ideally all the other tests for all the endpoints should be here
});
