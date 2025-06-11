
import { Controller, Get, Query } from "@nestjs/common";
import { MapService } from "./map.service";

@Controller('map')
export class MapController{
    constructor(private readonly mapService: MapService){}

    @Get('nearby')
    async getNearby(
        @Query('lat') lat: string,
        @Query('lng') lng: string,
        @Query('radius') radius: string,
        @Query('type') type: string,
    ) {
        const latNum = parseFloat(lat);
        const lngNum = parseFloat(lng);
        const radiusMeters = parseFloat(radius) || 5000;

        return this.mapService.findNearby(type, latNum, lngNum, radiusMeters);
    }
}