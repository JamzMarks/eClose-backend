import { AuthCommands } from '@app/common/constants/auth.commands';
import { CreateUserDto } from '@app/common/dtos/user/create-user.dto';
import { LoginDto } from '@app/common/dtos/user/login.dto';
import {
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { UseAxiosErrorInterceptor } from '../decorator/useAxiosErrorInterceptor';

@UseAxiosErrorInterceptor()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @Post('signin')
  async authSignIn(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { data } = await firstValueFrom(
      this.httpService.post('http://localhost:3002/auth/signin', body),
    );
    return data;
  }

  @Post('signup')
  async authSignUp(@Body() body: CreateUserDto) {
    const { data } = await firstValueFrom(
      this.httpService.post('http://localhost:3002/auth/signup', body),
    );
    return data;
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return { success: true };
  }
}
