import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller('auth')
export class AuthController {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) {}
        
    @Post()
    async AuthSignIn(@Body() body: any) {
        console.log('AuthSignIn', body);
        return this.authClient.send({ cmd: 'sign_in' }, {}).toPromise();
    }
    @Post()
    async AuthSignUp() {
        return this.authClient.send({ cmd: 'sign_up' }, {}).toPromise();
    }
}