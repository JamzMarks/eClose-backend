import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller('user')
export class UserController {
    constructor(
        @Inject('USER_SERVICE') private readonly userClient: ClientProxy) {}
    @Get()
    async getUsers() {
        return this.userClient.send({ cmd: 'get_users' }, {}).toPromise();
    }
}