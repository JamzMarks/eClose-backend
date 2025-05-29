import { Module } from "@nestjs/common";
import { Venue } from "./venue.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VenueService } from "./venue.service";
import { VenueController } from "./venue.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Venue])], 
    controllers: [VenueController],
    providers: [VenueService],
    exports: [],})
export class VenueModule {

}