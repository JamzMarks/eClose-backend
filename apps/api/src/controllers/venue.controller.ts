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
    
    @Get()
    async findAll(@User() user: any) {
        return await this.venueClient.send({cmd: VenueCommands.FIND_ALL}, {},).toPromise()
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createVenue(@Body() venue: CreateVenueDto, @User() user: any) {
        return this.venueClient.send(
            { cmd: VenueCommands.CREATE },
            { venue, user: { id: user.sub, roles: user.roles } }
        ).toPromise();
    }
}