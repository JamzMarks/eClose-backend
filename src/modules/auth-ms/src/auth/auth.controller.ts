import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AuthResponseDto } from "./dto/auth-response.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() user: any ): Promise<any> {
        return await this.authService.signIn(user.email, user.password);
    }
    
    @Post('signup')
    signUp(@Body() body: any): Promise<any> {
        return this.authService.signUp(body);
    }

    @Post('refresh')
    async refreshToken(@Body('refreshToken') refreshToken: string): Promise<AuthResponseDto> {
        return this.authService.refreshToken(refreshToken);
    }
}