import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller('user')
export class UserController {
    constructor(
        @Inject('USER_SERVICE') private readonly userClient: ClientProxy) {}

    @Get()
    async getUsers() {
        return this.userClient.send({ cmd: 'find_users' }, {}).toPromise();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.userClient.send({ cmd: 'find_users_by_id' }, id).toPromise();
    }

    @Get('email/:email')
    async getUserByEmail(@Param('email') email: string) {
        console.log('getUserByEmail', email);
        return this.userClient.send({ cmd: 'find_users_by_email' }, email).toPromise();
    }

    @Get('un/:username')
    async getUserByUsername(@Param('username') username: string) {
        return this.userClient.send({ cmd: 'find_users_by_username' }, username).toPromise();
    }

    @Post()
    async createUser(@Body() createUserDto: any) {
        return this.userClient.send({ cmd: 'create_user' }, createUserDto).toPromise();
    }
}