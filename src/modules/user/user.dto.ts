import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserDto {
    id: string;
    name: string;
    email: string;
}

export class CreateUserDto {

    @IsString()
    username: string;
    
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}