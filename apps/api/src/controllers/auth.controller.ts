import { AuthCommands } from "@app/common/constants/auth.commands";
import { CreateUserDto } from "@app/common/dtos/user/create-user.dto";
import { LoginDto } from "@app/common/dtos/user/login.dto";
import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Controller('auth')
export class AuthController {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy
    ) {}
        
    @Post('signin')
    async authSignIn(@Body() body: LoginDto){
        return await firstValueFrom(this.authClient.send({ cmd: AuthCommands.SIGN_IN }, body));

    }
    
    @Post('signup')
    async authSignUp(@Body() body: CreateUserDto){
        return await firstValueFrom(this.authClient.send({ cmd: AuthCommands.SIGN_UP }, body));
    }
}