import { Event } from './event.entity';
import { EventService } from './event.service';
import { Controller, Get } from "@nestjs/common";

@Controller('event')
export class EventController{
    constructor(private readonly eventService: EventService){}

    @Get()
    getEvents(): Event[] {
        return this.eventService.getEvents();
    }
    @Get(':id')
    getEventById(id: number): Event {
        return this.eventService.getEventById(id);
    }

}