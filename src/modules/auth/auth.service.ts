import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { AuthResponseDto } from "./auth.dto";
import { compareSync } from "bcrypt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    private jwtExpirationTime: number;
    constructor(
        private userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ){
        this.jwtExpirationTime = this.configService.get<number>('JWT_EXPIRATION_TIME') || 3600;
    }


    async signIn(email: string, password: string): Promise<AuthResponseDto>{
        const user =  this.userService.findUserByEmail(email)
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
}