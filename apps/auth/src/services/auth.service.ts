import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { JwtPayload } from '@app/common/contracts/auth/jwt-payload.interface';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateUserDto } from '@app/common/dtos/user/create-user.dto';
import { UserCommands } from '@app/common/constants/user.commands';
import { firstValueFrom } from 'rxjs';
import { UserDto } from '@app/common/dtos/user/user.dto';

@Injectable()
export class AuthService {
  private jwtExpirationTime: number;
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTime =
      this.configService.get<number>('JWT_EXPIRATION_TIME') || 3600;
  }
  async sendAndAwait<T>(cmd: string, payload: any): Promise<T> {
    return await firstValueFrom(this.userClient.send<T>({ cmd }, payload));
  }

  async signIn(email: string, password: string): Promise<AuthResponseDto> {
      const user = await this.sendAndAwait<UserDto>(UserCommands.FIND_BY_EMAIL_WITH_PASSWORD, email);
      
      if (!user || !user.password || !(await compare(password, user.password))) {
        // throw new RpcException({ statusCode: 401, message: 'Invalid credentials' });
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload: JwtPayload = {
        sub: user.id,
        email: user.email,
        role: user.role
      };

      const accessToken = this.jwtService.sign(payload, {
        expiresIn: `${this.jwtExpirationTime}s`,
      });
      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: '7d',
      });

      return {
        accessToken,
        refreshToken,
        expiresIn: this.jwtExpirationTime,
      };
  }

  async signUp(userDto: CreateUserDto): Promise<AuthResponseDto> {
    try {
      const user = await this.sendAndAwait<UserDto>(UserCommands.CREATE, userDto);
      // Gera o token
      const payload: JwtPayload = { sub: user.id, email: user.email, role: user.role };
      const accessToken = this.jwtService.sign(payload, {
        expiresIn: `${this.jwtExpirationTime}s`,
      });

      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: '7d', // pode ser 15d, 30d, etc.
      });

      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresIn: this.jwtExpirationTime,
      };
    } catch (error) {
      console.log(error)
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message || 'Erro interno no servidor',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,) 
    }    
  }

  async refreshToken(refreshToken: string): Promise<AuthResponseDto> {
    try {
      const payload = await this.jwtService.verify(refreshToken);
      const accessToken = this.jwtService.sign({
        sub: payload.sub,
        email: payload.email,
      });
      const newRefreshToken = this.jwtService.sign(
        { sub: payload.sub, email: payload.email },
        {
          expiresIn: '7d',
        },
      );

      return {
        accessToken,
        refreshToken: newRefreshToken,
        expiresIn: this.jwtExpirationTime,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
      //  throw new RpcException({ statusCode: 401, message: 'Invalid refresh token' });
    }
  }
}
