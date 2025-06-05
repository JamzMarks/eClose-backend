import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Venue } from './venue.entity';
import { Repository } from 'typeorm';
import { CreateVenueDto } from '@app/common/dtos/venue/venue.dto';

@Injectable()
export class VenueService {
  constructor(
    @InjectRepository(Venue) private readonly repo: Repository<Venue>
  ){}

  async findAll(): Promise<Venue[]>{
    return await this.repo.find({
            skip: 0,
            take: 20,
        })
  }

  async createVenue(dto: CreateVenueDto): Promise<Venue>{
    const newVenue = this.repo.create(dto)
    return await this.repo.save(newVenue)
  }
}
