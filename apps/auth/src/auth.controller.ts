import { Body, Controller, HttpCode } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { MessagePattern } from "@nestjs/microservices";
import { AuthCommands } from "@app/common/constants/auth.commands";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ){}

    // @HttpCode(HttpStatus.OK)
    @MessagePattern({ cmd: AuthCommands.SIGN_IN })
    async login(@Body() user: any ): Promise<any> {
        return await this.authService.signIn(user.email, user.password);
    }
    
    @MessagePattern({ cmd: AuthCommands.SIGN_UP })
    signUp(@Body() body: any): Promise<any> {
        return this.authService.signUp(body);
    }

    @MessagePattern({ cmd: AuthCommands.REFRESH })
    async refreshToken(@Body('refreshToken') refreshToken: string): Promise<AuthResponseDto> {
        return this.authService.refreshToken(refreshToken);
    }
}