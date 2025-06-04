import {
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserClientService } from './user-client.service';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { CreateUserDto } from '../types/user.dto';
import { JwtPayload } from '@app/common/contracts/auth/jwt-payload.interface';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  private jwtExpirationTime: number;
  constructor(
    private userService: UserClientService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTime =
      this.configService.get<number>('JWT_EXPIRATION_TIME') || 3600;
  }

  async signIn(email: string, password: string): Promise<AuthResponseDto> {
      const user = await this.userService.findUserByEmailWithPassword(email);
      console.log('User found:', user);

      if (!user || !(await compare(password, user.password))) {
        throw new RpcException({ statusCode: 401, message: 'Invalid credentials' });
      }

      const payload: JwtPayload = {
        sub: user.id,
        email: user.email,
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
    const existingUser = await this.userService.findUserByEmail(userDto.email);
    if (existingUser) {
      throw new RpcException({ statusCode: 409, message: 'Email already in use' });
    }

    // Cria o usuário
    const user = await this.userService.createUser(userDto);

    // Gera o token
    const payload: JwtPayload = { sub: user.id, email: user.email };
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
       throw new RpcException({ statusCode: 401, message: 'Invalid refresh token' });
    }
  }
}
