import { Controller, Get, UseGuards } from '@nestjs/common';
import { VenueService } from './venue.service';
import { MessagePattern } from '@nestjs/microservices';
import { VenueCommands } from '@app/common/constants/venue.commands';
import { CreateVenueDto } from '../../../libs/common/src/dtos/venue/venue.dto';
import { Venue } from './venue.entity';
import { Roles } from '@app/common/decorators/roles.decorator';
import { RolesGuard } from '@app/common/guards/auth/roles.guard';
import { JwtAuthGuard } from '@app/common/guards/auth/jwt-auth.guard';


@Controller()
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @UseGuards(RolesGuard)
  @Roles('user')
  @MessagePattern({cmd: VenueCommands.FIND_ALL})
  findAll(): Promise<Venue[]>{
    return this.venueService.findAll()
  }

  @MessagePattern({cmd: VenueCommands.CREATE})
  createVenue(dto: CreateVenueDto): Promise<Venue>{
    return this.venueService.createVenue(dto)
  }
}
