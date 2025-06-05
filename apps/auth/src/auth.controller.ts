import { Controller } from "@nestjs/common";
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

    @MessagePattern({ cmd: AuthCommands.SIGN_IN })
    async signIn(@Payload() user: LoginDto ): Promise<AuthResponseDto> {
        return await this.authService.signIn(user.email, user.password);
    }
    
    @MessagePattern({ cmd: AuthCommands.SIGN_UP })
    signUp(@Payload() user: any): Promise<any> {
        return this.authService.signUp(user);
    }

    @MessagePattern({ cmd: AuthCommands.REFRESH })
    async refreshToken(@Payload('refreshToken') refreshToken: string): Promise<AuthResponseDto> {
        return this.authService.refreshToken(refreshToken);
    }
}