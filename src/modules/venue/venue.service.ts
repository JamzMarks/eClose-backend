import { Injectable } from "@nestjs/common";
import { Venue } from "./venue.entity";
import { Repository } from "typeorm";

@Injectable()
export class VenueService {
    constructor(
        private readonly venueRepository: Repository<Venue> 
    ) {}

    async findAll(): Promise<Venue[]> {
        return await this.venueRepository.find();
    }
    
    async findVenueById(id: string): Promise<Venue | null> {
        return await this.venueRepository.findOne({where: {id}})
    }
}