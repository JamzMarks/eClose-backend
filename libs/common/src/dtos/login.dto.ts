import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
    
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}