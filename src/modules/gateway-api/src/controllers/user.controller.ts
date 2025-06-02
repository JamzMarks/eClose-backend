import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller('user')
export class UserController {
    constructor(
        @Inject('USER_SERVICE') private readonly userClient: ClientProxy) {}

    @Get()
    async getUsers() {
        return this.userClient.send({ cmd: 'get_users' }, {}).toPromise();
    }

    @Post()
    async createUser(@Body() createUserDto: any) {
        return this.userClient.send({ cmd: 'create_user' }, createUserDto).toPromise();
    }
}