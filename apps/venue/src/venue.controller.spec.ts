import { Test, TestingModule } from '@nestjs/testing';
import { VenueController } from './venue.controller';
import { VenueService } from './venue.service';

describe('VenueController', () => {
  let venueController: VenueController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [VenueController],
      providers: [VenueService],
    }).compile();

    venueController = app.get<VenueController>(VenueController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(venueController.getHello()).toBe('Hello World!');
    });
  });
});
