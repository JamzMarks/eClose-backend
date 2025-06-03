import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateVenueDto {
     // Informações principais
    @IsString()
    name: string;

    @IsString()
    description?: string;

    @IsNumber()
    capacity: number;

    // Localização
    @IsString()
    address: string;

    @IsString()
    city: string;

    @IsString()
    state: string;

    @IsString()
    country: string;

    @IsString()
    postalCode: string;

    // Contato
    @IsEmail()
    email?: string;

    @IsString()
    phone?: string;

}