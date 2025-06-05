import { VenueCommands } from "@app/common/constants/venue.commands";
import { CreateVenueDto } from "@app/common/dtos/venue/venue.dto";
import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller('venue')
export class VenueController{
    constructor(
        @Inject('VENUE_SERVICE') private readonly venueClient: ClientProxy
    ){}

    @Get()
    async findAll() {
        return this.venueClient.send({cmd: VenueCommands.FIND_ALL}, {}).toPromise()
    }

    @Post()
    async createVenue(@Body() venue: CreateVenueDto){
        return this.venueClient.send({cmd: VenueCommands.CREATE}, venue).toPromise()
    }
}