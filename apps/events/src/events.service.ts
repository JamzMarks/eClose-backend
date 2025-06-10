import { LessThan, MoreThan, Repository } from 'typeorm';
import { CreateEventDto } from '@app/common/dtos/events/create-event.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Events } from './events.entity';
import { NotFoundRpcException } from '@app/common/exceptions/NotFoundRpcException';

@Injectable()
export class EventsService {

  constructor(
    @InjectRepository(Events)
    private readonly repo: Repository<Events>
  ){

  }

  async findAll(): Promise<Events[]> {
    return this.repo.find({
      order: { startDate: 'ASC' },
      take: 50,
    });
  }

  async findEventById(id: string): Promise<Events | null>{
    return await this.repo.findOne({ where: { id }});
  }

  async findEventsByOrganizer(organizerId: string): Promise<Events[]> {
    return await this.repo.find({ where: { organizerId } });
  }

  async findEventsByDate(startDate: Date): Promise<Events[]> {
    return await this.repo.find({ where: { startDate } });
  }

  async findUpcomingEvents(): Promise<Events[]> {
    const now = new Date();
    return await this.repo.find({ where: { startDate: MoreThan(now) }, order: { startDate: 'ASC' } });
  }

  async findPastEvents(): Promise<Events[]> {
    const now = new Date();
    return await this.repo.find({ where: { startDate: LessThan(now) }, order: { startDate: 'DESC' } });
  }

  async createEvent(dto: CreateEventDto): Promise<Events> {
    const dateAsDate = new Date(dto.date);

    const newEvent = this.repo.create({
      ...dto,
      startDate: dateAsDate,
    });
    return await this.repo.save(newEvent);
  }

  async updateEvent(id: string, updates: Partial<CreateEventDto>): Promise<Events> {
    const event = await this.repo.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundRpcException(`Event with ID ${id} not found`);
    }
    Object.assign(event, updates);
    return await this.repo.save(event);
  }

  async deleteEvent(id: string): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundRpcException(`Event with ID: ${id} not found`);
    }
  }

  async cancelEvent(id: string): Promise<Events> {
    const event = await this.repo.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundRpcException(`Event with ID ${id} not found`);
    }
    event.description = `[CANCELLED] ${event.description || ''}`;
    return this.repo.save(event);
  }
}
