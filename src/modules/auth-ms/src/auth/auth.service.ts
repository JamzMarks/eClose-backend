import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthResponseDto } from "../types/auth.dto";
import { compareSync } from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { UserClientService } from "./user-client.service";
import { CreateUserDto } from "../types/user.dto";

@Injectable()
export class AuthService {
    private jwtExpirationTime: number;
    constructor(
        private userService: UserClientService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ){
        this.jwtExpirationTime = this.configService.get<number>('JWT_EXPIRATION_TIME') || 3600;
    }


    async signIn(email: string, password: string): Promise<AuthResponseDto>{
        const user =  await this.userService.findUserByEmail(email)
        if(!user || compareSync(password, user.password) === false){
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = {
            sub: user.id,
            email: user.email
        }
        const token = this.jwtService.sign(payload);

        return {
            accessToken: token,
            expiresIn: this.jwtExpirationTime,
        }
    }
    
    async signUp(userDto: CreateUserDto): Promise<AuthResponseDto> {
        const existingUser = await this.userService.findUserByEmail(userDto.email);
        if (existingUser) {
            throw new ConflictException('Email already in use');
        }

        // Cria o usuário
        const user = await this.userService.createUser(userDto);

        // Gera o token
        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);

        return {
            accessToken: token,
            expiresIn: this.jwtExpirationTime,
        };
    }
}