import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller('auth')
export class AuthController {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy
    ) {}
        
    @Post('signin')
    async AuthSignIn(@Body() body: any) {
        return this.authClient.send({ cmd: 'sign_in' }, body).toPromise();
    }
    
    @Post('signup')
    async AuthSignUp() {
        return this.authClient.send({ cmd: 'sign_up' }, {}).toPromise();
    }
}