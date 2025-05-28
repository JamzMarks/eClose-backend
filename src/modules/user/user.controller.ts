import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { CreateUserDto, UserDto } from "./user.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    getUsers(): User[]{
        return this.userService.getUsers();
    }

    @Get(':id')
    getUserById(id: string): User | null {
        return this.userService.getUserById(id);
    }

    @Get('email/:email')
    findUserByEmail(email: string): User | null {
        return this.userService.findUserByEmail(email);
    }
    
    @Post()
    createUser(@Body() user: CreateUserDto): UserDto {
        return this.userService.createUser(user);
    }
}
