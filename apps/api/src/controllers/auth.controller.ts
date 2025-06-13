import { AuthCommands } from "@app/common/constants/auth.commands";
import { CreateUserDto } from "@app/common/dtos/user/create-user.dto";
import { LoginDto } from "@app/common/dtos/user/login.dto";
import { Body, Controller, Inject, Post, Res } from "@nestjs/common";
import { Response } from 'express';
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Controller('auth')
export class AuthController {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy
    ) {}
        
    @Post('signin')
    async authSignIn(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response){
        const { accessToken, refreshToken, expiresIn } = await firstValueFrom(this.authClient.send({ cmd: AuthCommands.SIGN_IN }, body));
        console.log('accessToken: ' + accessToken)
        res.cookie('accessToken', accessToken, {
            secure: false,
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: expiresIn * 1000, // milissegundos
            path: '/',
        });

        res.cookie('refreshToken', refreshToken, {
            secure: false,
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
            path: '/',
        });

         return { success: true };
    }
    
    @Post('signup')
    async authSignUp(@Body() body: CreateUserDto){
        return await firstValueFrom(this.authClient.send({ cmd: AuthCommands.SIGN_UP }, body));
    }

    @Post('logout')
        logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return { success: true };
    }
}