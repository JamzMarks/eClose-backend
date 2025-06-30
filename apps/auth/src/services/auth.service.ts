import {
  Get,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hashSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { JwtPayload } from '@app/common/contracts/auth/jwt-payload.interface';
import { CreateUserDto } from '@app/common/dtos/user/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUser } from '../repository/authUser.entity';

@Injectable()
export class AuthService {
  private jwtExpirationTime: number;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(AuthUser)
    private readonly repo: Repository<AuthUser>,
  ) {
    this.jwtExpirationTime =
      this.configService.get<number>('JWT_EXPIRATION_TIME') || 3600;
  }

  async signIn(email: string, password: string): Promise<AuthResponseDto> {
     
    const normalizedEmail = email.trim().toLowerCase();
    const user = await this.repo.findOne({
      where: { email: normalizedEmail },
      select: ['id', 'email', 'password'],
    });

    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
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
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  async signUp(userDto: CreateUserDto): Promise<AuthResponseDto> {
    const normalizedEmail = userDto.email.trim().toLowerCase();

    const existing = await this.repo.findOne({
      where: { email: normalizedEmail },
    });
    if (existing) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: 'Email já está em uso',
        },
        HttpStatus.CONFLICT,
      );
    }

    const newUser = this.repo.create({
      ...userDto,
      email: normalizedEmail,
      password: hashSync(userDto.password, 10),
    });

    const savedUser = await this.repo.save(newUser);

    const payload: JwtPayload = {
      sub: savedUser.id,
      email: savedUser.email,
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
      user: {
        id: savedUser.id,
        email: savedUser.email,
      },
    };
  }

  async refreshToken(refreshToken: string): Promise<AuthResponseDto> {
    try {
      const payload = await this.jwtService.verify<JwtPayload>(refreshToken);

      const user = await this.repo.findOne({ where: { id: payload.sub } });
      if (!user) {
        throw new UnauthorizedException('User no longer exists');
      }

      const newPayload: JwtPayload = {
        sub: user.id,
        email: user.email,
      };

      const accessToken = this.jwtService.sign(newPayload, {
        expiresIn: `${this.jwtExpirationTime}s`,
      });

      const newRefreshToken = this.jwtService.sign(newPayload, {
        expiresIn: '7d',
      });

      return {
        accessToken,
        refreshToken: newRefreshToken,
        expiresIn: this.jwtExpirationTime,
        user: {
          id: user.id,
          email: user.email,
        },
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  @Get('health')
  getHealth() {
    return { status: 'ok' };
  }
}
