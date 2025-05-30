import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { UserClientService } from "./user-client.service";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '../.env',
            }),],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                expiresIn: configService.get<number>('JWT_EXPIRATION_TIME'),
                },
            }),
            inject: [ConfigService],
        }),
        HttpModule
    ],
    controllers: [AuthController],
    providers: [AuthService, UserClientService],
    exports: [],
})
export class AuthModule {
}