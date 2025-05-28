import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserDto {
    id: string;
    name: string;
    email: string;
}

export class CreateUserDto {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}