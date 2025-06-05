import { Body, Controller} from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { UserService } from "./users.service";
import { User } from "./types/user.entity";
import { UserCommands } from "@app/common/constants/user.commands";
import { CreateUserDto } from "@app/common/dtos/user/create-user.dto";
import { UserDto } from "@app/common/dtos/user/user.dto";


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @MessagePattern({ cmd: UserCommands.FIND_ALL })
    getUsers(): Promise<User[]>{
        return this.userService.findAll();
    }
    
    @MessagePattern({ cmd: UserCommands.FIND_BY_ID })
    findUserById(id: string): Promise<User | null> {
        return this.userService.findUserById(id);
    }

    @MessagePattern({ cmd: UserCommands.FIND_BY_EMAIL })
    findUserByEmail(email: string): Promise<User | null> {
        return this.userService.findUserByEmail(email);
    }

    @MessagePattern({ cmd: UserCommands.FIND_BY_EMAIL_WITH_PASSWORD })
    findUserByEmailWithPassword(email: string): Promise<User | null> {
        return this.userService.findUserByEmailWithPassword(email);
    }

    @MessagePattern({ cmd: UserCommands.FIND_BY_USERNAME })
    findUserByUsername(username: string): Promise<User | null> {
        return this.userService.findUserByUsername(username);
    }

    @MessagePattern({ cmd: UserCommands.CREATE })
    createUser(@Body() user: CreateUserDto): Promise<User> {
        return this.userService.createUser(user);
    }

    
    @MessagePattern({ cmd: UserCommands.UPDATE })
    updateUser(@Body() user: UserDto, id: string): Promise<User | null> {
        return this.userService.updateUser(id, user);
    }

    @MessagePattern({ cmd: UserCommands.DELETE })
    deleteUser(@Body() id: string): Promise<void> {
        return this.userService.deleteUser(id);
    }
}
