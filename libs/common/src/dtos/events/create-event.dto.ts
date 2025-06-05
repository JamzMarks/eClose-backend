import {
  IsISO8601,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsIn,
} from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsISO8601() // aceita string no formato ISO 8601
  date: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  description?: string;

  //deve ser um id de usuer ou de venue
  @IsNotEmpty()
  @IsString()
  organizerId: string;

  @IsNotEmpty()
  @IsIn(['user', 'venue'])
  organizerType: 'user' | 'venue';

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  admins?: string[];
}
