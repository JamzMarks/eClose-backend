import { AuthCommands } from '@app/common/constants/auth.commands';
import { CreateUserDto } from '@app/common/dtos/user/create-user.dto';
import { LoginDto } from '@app/common/dtos/user/login.dto';
import {
  Body,
  Controller,
  HttpException,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy
    ) {}

    @Post('signin')
    async authSignIn(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response){
        const { accessToken, refreshToken, expiresIn } = await firstValueFrom(this.authClient.send({ cmd: AuthCommands.SIGN_IN }, body));
        res.cookie('accessToken', accessToken, {
            secure: false,
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: expiresIn * 1000,
            path: '/',
        });

        res.cookie('refreshToken', refreshToken, {
            secure: false,
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
        });

         return { accessToken, refreshToken, expiresIn  };
    }

    @Post('signup')
    async authSignUp(@Body() body: CreateUserDto){
        return await firstValueFrom(this.authClient.send({ cmd: AuthCommands.SIGN_UP }, body));
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return { success: true };
    }
}
// @Controller('auth')
// export class AuthController {
//   private url: string;

//   constructor(
//     private readonly httpService: HttpService,
//     private readonly config: ConfigService,
//   ) {
//     this.url = `${this.config.get('AUTH_SERVICE_URL')}`;
//   }

//   @Post('signin')
//   async authSignIn(
//     @Body() body: LoginDto,
//     @Res({ passthrough: true }) res: Response,
//   ) {
//     // try {
//     const { data } = await lastValueFrom(
//       this.httpService.post(`${this.url}/auth/signin`, body),
//     );

//     const { accessToken, refreshToken, expiresIn } = data;

//     res.cookie('accessToken', accessToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax',
//       maxAge: expiresIn * 1000,
//       path: '/',
//     });

//     res.cookie('refreshToken', refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax',
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//       path: '/',
//     });

//     return { accessToken, refreshToken, expiresIn };
//     // } catch (error) {
//         // console.log(error)
//     // }
//   }

//   @Post('signup')
//   async authSignUp(@Body() body: CreateUserDto) {
//     const { data } = await lastValueFrom(
//       this.httpService.post(`${this.url}/auth/signup`, body),
//     );
//     return data;
//   }

//   @Post('logout')
//   async logout(@Res({ passthrough: true }) res: Response) {
//     res.clearCookie('accessToken');
//     res.clearCookie('refreshToken');
//     return { success: true };
//   }
// }
