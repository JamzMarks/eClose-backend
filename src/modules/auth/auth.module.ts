import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        JwtModule.registerAsync({
            global: true, // Makes the JWT module available globally
            imports: [], 
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions:{
                    expiresIn: configService.get<number>('JWT_EXPIRATION_TIME')
                }
            }),
            inject: [ConfigService] // Injects the ConfigService to access environment variables
        }),
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [],
})
export class AuthModule {
}