import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthService } from "./services/auth.service";
// import { UserClientService } from "./services/user-client.service";
import { userClientProvider } from "./auth.providers";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: 'apps/auth/.env',
            }),],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<number>('JWT_EXPIRATION_TIME'),
                },
            }),
            inject: [ConfigService],
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, userClientProvider],
    exports: [],
})
export class AuthModule {
}