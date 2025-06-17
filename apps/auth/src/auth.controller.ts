import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { AuthCommands } from "@app/common/constants/auth.commands";
import { LoginDto } from "@app/common/dtos/user/login.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ){}

    @Post('signin')
    // @MessagePattern({ cmd: AuthCommands.SIGN_IN })
    async signIn(@Payload() user: LoginDto ): Promise<AuthResponseDto> {
        console.log(user)
        return await this.authService.signIn(user.email, user.password);
    }
    
    @Post('signup')
    // @MessagePattern({ cmd: AuthCommands.SIGN_UP })
    signUp(@Payload() user: any): Promise<any> {
        return this.authService.signUp(user);
    }

    @Post('logout')
    // @MessagePattern({ cmd: AuthCommands.REFRESH })
    async refreshToken(@Payload('refreshToken') refreshToken: string): Promise<AuthResponseDto> {
        return this.authService.refreshToken(refreshToken);
    }
}