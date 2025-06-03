import { Controller, Get } from '@nestjs/common';
import { VenueService } from './venue.service';

@Controller()
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @Get()
  getHello(): string {
    return this.venueService.getHello();
  }
}
