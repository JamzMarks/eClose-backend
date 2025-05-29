import { Event } from './event.entity';
import { EventService } from './event.service';
import { Controller, Get } from "@nestjs/common";

@Controller('event')
export class EventController{
    constructor(private readonly eventService: EventService){}

    @Get()
    getEvents():Promise<Event[]> {
        return this.eventService.findAll();
    }
    
    @Get(':id')
    getEventById(id: number): Promise< Event | null> {
        return this.eventService.findEventById(id);
    }

}