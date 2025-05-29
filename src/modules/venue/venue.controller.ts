import { Venue } from './venue.entity';
import { Controller, Get } from "@nestjs/common";
import { VenueService } from './venue.service';


@Controller('venue')
export class VenueController{
    constructor(
        private readonly venueService: VenueService
    ){}

    @Get()
    findAllVenues(): Promise<Venue[]> {
        return this.venueService.findAll();
    }
    @Get(':id')
    findVenueById(id: string): Promise<Venue | null> {
        return this.venueService.findVenueById(id);
    }
}