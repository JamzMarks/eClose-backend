import {
  IsEmail,
  IsNumber,
  IsString,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateVenueDto {
  // Informações principais
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  maxCapacity?: number;

  // Localização
  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  postalCode: string;

  @IsString()
  country: string;

  // Contato
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  // Controle de administradores - array de strings (IDs)
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  adminsId?: string[];
}
