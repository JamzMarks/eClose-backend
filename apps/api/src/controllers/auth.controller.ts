import { AuthCommands } from "@app/common/constants/auth.commands";
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
        const teste = await firstValueFrom(this.authClient.send({ cmd: AuthCommands.SIGN_IN }, body));
        console.log(teste)
        return teste

    }
    
    @Post('signup')
    async authSignUp(@Body() body: any){
        return await firstValueFrom(this.authClient.send({ cmd: AuthCommands.SIGN_UP }, body));
    }
}