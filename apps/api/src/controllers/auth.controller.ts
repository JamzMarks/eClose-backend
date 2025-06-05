import { LoginDto } from "@app/common/dtos/user/login.dto";
import { BadRequestException, Body, Controller, HttpException, Inject, InternalServerErrorException, Post, ValidationPipe } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Controller('auth')
export class AuthController {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy
    ) {}
        
    @Post('signin')
    async authSignIn(@Body() body: LoginDto){
        return await firstValueFrom(this.authClient.send({ cmd: 'sign_in' }, body));

    }
    
    @Post('signup')
    async authSignUp(@Body() body: any){
        return await firstValueFrom(this.authClient.send({ cmd: 'sign_up' }, body));
    }
}