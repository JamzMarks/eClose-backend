import { Injectable, NotFoundException } from "@nestjs/common";
import { Event } from "./event.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()   
export class EventService {
    constructor(
        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>
    ) {}

    async findAll(): Promise<Event[]> {
        return await this.eventRepository.find();
    }
    async findEventById(id: number): Promise<Event | null> {
        return await this.eventRepository.findOne({ where: { id } })
    }
    async createEvent(event: Event): Promise<Event> {
        const newEvent = this.eventRepository.create(event);
        return await this.eventRepository.save(newEvent);
    }
    async updateEvent(id: number, event: Partial<Event>): Promise<Event> {
        const existingEvent = await this.eventRepository.findOne({ where: { id } });
        if (!existingEvent) {
            throw new NotFoundException(`Event with ID ${id} not found`);
        }
        const updatedEvent = Object.assign(existingEvent, event);
        return this.eventRepository.save(updatedEvent);
    }
    async deleteEvent(id: number): Promise<void> {
        const result = await this.eventRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID: ${id} not found`);
        }
    }

}

