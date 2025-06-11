import { UserCommands } from "@app/common/constants/user.commands";
import { Body, Controller, Delete, Get, Inject, Param, Post, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { buildMicroserviceRequest } from "../utils/buildMicroserviceRequest";
import { User } from "../decorator/user.decorator";
import { JwtAuthGuard } from "@app/common/guards/auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(
        @Inject('USER_SERVICE') private readonly userClient: ClientProxy) {}

    
    @Get()
    async findAll(@User() user: any) {
        const payload = buildMicroserviceRequest(user)
        return this.userClient.send({ cmd: UserCommands.FIND_ALL }, payload).toPromise();
    }

    @Get(':id')
    async findUserById(@Param('id') id: string, @User() user: any) {
        const payload = buildMicroserviceRequest(user, id)
        return this.userClient.send({ cmd: UserCommands.FIND_BY_ID }, payload).toPromise();
    }

    @Get('email/:email')
    async findUserByEmail(@Param('email') email: string) {
        return this.userClient.send({ cmd: UserCommands.FIND_BY_EMAIL }, email).toPromise();
    }

    @Get('un/:username')
    async findUserByUsername(@Param('username') username: string) {
        return this.userClient.send({ cmd: UserCommands.FIND_BY_USERNAME }, username).toPromise();
    }

    
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return this.userClient.send({ cmd: UserCommands.DELETE }, id).toPromise();
    }
}