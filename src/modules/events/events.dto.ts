import { IsString } from "class-validator";


export class CreateEventDto {

    @IsString()
    name: string;

    date: Date;

    location: string;

    @IsString()
    description: string;

    organizer: string;
}

