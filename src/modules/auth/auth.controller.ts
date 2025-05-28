import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() user: any ): Promise<any> {
        return this.authService.signIn(user.email, user.password);
    }
}