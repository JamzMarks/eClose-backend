import { Controller} from '@nestjs/common';
import { VenueService } from './venue.service';
import { MessagePattern } from '@nestjs/microservices';
import { VenueCommands } from '@app/common/constants/venue.commands';
import { CreateVenueDto } from '../../../libs/common/src/dtos/venue/venue.dto';
import { Venue } from './venue.entity';
import { DataMicroserviceRequest, MicroserviceRequest } from '@app/common/contracts/messages/microservice-request.interface';


@Controller()
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @MessagePattern({cmd: VenueCommands.FIND_ALL})
  findAll(_: MicroserviceRequest): Promise<Venue[]>{
    return this.venueService.findAll()
  }

  @MessagePattern({cmd: VenueCommands.CREATE})
  createVenue(dto: DataMicroserviceRequest<CreateVenueDto>): Promise<Venue>{
    return this.venueService.createVenue(dto.data)
  }
}
