import { VenueCommands } from "@app/common/constants/venue.commands";
import { CreateVenueDto } from "@app/common/dtos/venue/venue.dto";
import { Body, Controller, Get, Inject, Post, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { User } from "../decorator/user.decorator";

@Controller('venue')
export class VenueController{
    constructor(
        @Inject('VENUE_SERVICE') private readonly venueClient: ClientProxy
    ){}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@User() user: any) {
        return this.venueClient.send({cmd: VenueCommands.FIND_ALL}, {user: { id: user.sub, roles: user.roles }},).toPromise()
    }

    @Post()
    async createVenue(@Body() venue: CreateVenueDto){
        console.log(VenueController)
        return this.venueClient.send({cmd: VenueCommands.CREATE}, venue).toPromise()
    }
}