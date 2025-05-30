import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { User } from "../types/user.entity";
import { UserService } from "./user.service";
import { CreateUserDto, UserDto } from "../types/user.dto";


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    getUsers(): Promise<User[]>{
        return this.userService.findAll();
    }

    @Get(':id')
    findUserById(id: string): Promise<User | null> {
        return this.userService.findUserById(id);
    }

    @Get('email/:email')
    findUserByEmail(email: string): Promise<User | null> {
        return this.userService.findUserByEmail(email);
    }
    
    @Post()
    createUser(@Body() user: CreateUserDto): Promise<User> {
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
