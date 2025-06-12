import { VenueCommands } from '@app/common/constants/venue.commands';
import { CreateVenueDto } from '@app/common/dtos/venue/venue.dto';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '../decorator/user.decorator';
import { buildMicroserviceRequest } from '../utils/buildMicroserviceRequest';

@Controller('venue')
export class VenueController {
  constructor(
    @Inject('VENUE_SERVICE') private readonly venueClient: ClientProxy,
  ) {}

  @Get()
  async findAll(@User() user: any) {
    const payload = buildMicroserviceRequest(user)
    return await this.venueClient
      .send({ cmd: VenueCommands.FIND_ALL }, payload)
      .toPromise();
  }

  @Post()
  async createVenue(@Body() venue: CreateVenueDto, @User() user: any) {
    const payload = buildMicroserviceRequest(user, venue)
    return this.venueClient
      .send({ cmd: VenueCommands.CREATE }, payload)
      .toPromise();
  }
}
