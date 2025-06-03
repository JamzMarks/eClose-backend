import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthService } from "./services/auth.service";
import { UserClientService } from "./services/user-client.service";
import { HttpModule } from "@nestjs/axios";
import { ClientsModule, Transport } from "@nestjs/microservices";

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
         ClientsModule.register([
            {
              name: 'USER_SERVICE',
              transport: Transport.RMQ,
              options: {
                urls: [process.env.RMQ_URL || 'amqp://localhost:5672'],
                queue: 'user_queue',
                queueOptions: { durable: true },
              },
            }]),
        HttpModule
    ],
    controllers: [AuthController],
    providers: [AuthService, UserClientService],
    exports: [],
})
export class AuthModule {
}