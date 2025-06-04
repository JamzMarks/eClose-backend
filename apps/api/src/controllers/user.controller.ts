import { UserCommands } from "@app/common/constants/user.commands";
import { Body, Controller, Delete, Get, Inject, Param, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller('user')
export class UserController {
    constructor(
        @Inject('USER_SERVICE') private readonly userClient: ClientProxy) {}

    @Get()
    async getUsers() {
        return this.userClient.send({ cmd: UserCommands.FIND_ALL }, {}).toPromise();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.userClient.send({ cmd: UserCommands.FIND_BY_ID }, id).toPromise();
    }

    @Get('email/:email')
    async getUserByEmail(@Param('email') email: string) {
        console.log('getUserByEmail', email);
        return this.userClient.send({ cmd: UserCommands.FIND_BY_EMAIL }, email).toPromise();
    }

    @Get('un/:username')
    async getUserByUsername(@Param('username') username: string) {
        return this.userClient.send({ cmd: UserCommands.FIND_BY_USERNAME }, username).toPromise();
    }

    @Post()
    async createUser(@Body() createUserDto: any) {
        return this.userClient.send({ cmd: UserCommands.CREATE }, createUserDto).toPromise();
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return this.userClient.send({ cmd: UserCommands.DELETE }, id).toPromise();
    }
}