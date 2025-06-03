import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { MessagePattern } from "@nestjs/microservices";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ){}

    @HttpCode(HttpStatus.OK)
    @MessagePattern({ cmd: 'sign_in' })
    async login(@Body() user: any ): Promise<any> {
        console.log('User login attempt:', user);
        if (!user || !user.email || !user.password) {
            throw new Error('Email and password are required');
        }
        return await this.authService.signIn(user.email, user.password);
    }
    
    @MessagePattern({ cmd: 'sign_up' })
    signUp(@Body() body: any): Promise<any> {
        return this.authService.signUp(body);
    }

    @MessagePattern({ cmd: 'refresh' })
    async refreshToken(@Body('refreshToken') refreshToken: string): Promise<AuthResponseDto> {
        return this.authService.refreshToken(refreshToken);
    }
}