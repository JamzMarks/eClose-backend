import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { User } from "../types/user.entity";
import { UserService } from "./user.service";
import { CreateUserDto, UserDto } from "../types/user.dto";
import { MessagePattern } from "@nestjs/microservices";


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @MessagePattern({ cmd: 'find_users' })
    getUsers(): Promise<User[]>{
        return this.userService.findAll();
    }
    
    @MessagePattern({ cmd: 'find_users_by_id' })
    findUserById(id: string): Promise<User | null> {
        return this.userService.findUserById(id);
    }

    @MessagePattern({ cmd: 'find_users_by_email' })
    findUserByEmail(email: string): Promise<User | null> {
        return this.userService.findUserByEmail(email);
    }

    @MessagePattern({ cmd: 'create_user' })
    createUser(@Body() user: CreateUserDto): Promise<User> {
        console.log('createUser', user);
        return this.userService.createUser(user);
    }

    @Patch(':id')
    updateUser(@Body() user: UserDto, id: string): Promise<User | null> {
        return this.userService.updateUser(id, user);
    }

    @Delete(':id')
    deleteUser(@Param() id: string): Promise<void> {
        return this.userService.deleteUser(id);
    }
}
