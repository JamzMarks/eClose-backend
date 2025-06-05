import { Controller, Get } from '@nestjs/common';
import { EventsService } from './events.service';
import { MessagePattern } from '@nestjs/microservices';
import { EventsCommands } from '@app/common/constants/events.commands';
import { Events } from './events.entity';
import { CreateEventDto } from '@app/common/dtos/events/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService
  ) {}

  @MessagePattern({ cmd: EventsCommands.FIND_ALL})
  async findAll(): Promise<Events[]>{
    return await this.eventsService.findAll()
  }

  @MessagePattern({cmd:EventsCommands.FIND_BY_ID })
  async findEventById(id: string): Promise<Events | null>{
    return await this.eventsService.findEventById(id)
  }

  @MessagePattern({cmd: EventsCommands.FIND_BY_ORGANIZER})
  async findEventByName(id: string): Promise<Events[]>{
    return await this.eventsService.findEventsByOrganizer(id)
  }

  @MessagePattern({cmd: EventsCommands.CREATE})
  async createEvent(event: CreateEventDto): Promise<Events>{
    return await this.eventsService.createEvent(event)
  }
}
