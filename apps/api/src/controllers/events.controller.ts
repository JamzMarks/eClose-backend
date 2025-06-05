import { EventsCommands } from '@app/common/constants/events.commands';
import { CreateEventDto } from '@app/common/dtos/events/create-event.dto';
import { Body, Controller, Get, Inject, Post, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';



@Controller('events')
export class EventsController {
    constructor(
        @Inject('EVENTS_SERVICE') private readonly eventClient: ClientProxy
    ){}

    @Get()
    async findAll(){
        return await firstValueFrom(this.eventClient.send({cmd: EventsCommands.FIND_ALL}, {}))
    }

    @Post()
    async createEvent(@Body() event: CreateEventDto){
        return await firstValueFrom(this.eventClient.send({cmd: EventsCommands.CREATE}, event))
    }
}