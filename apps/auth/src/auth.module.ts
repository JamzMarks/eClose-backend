import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './services/auth.service';
// import { UserClientService } from "./services/user-client.service";
import { userClientProvider } from './auth.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUser } from './repository/authUser.entity';
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: 'apps/auth/.env',
        }),
      ],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<number>('JWT_EXPIRATION_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      // useFactory: (configService: ConfigService) => ({
      //     type: 'mysql',
      //     host: configService.get<string>('DB_HOST'),
      //     port: configService.get<number>('DB_PORT'),
      //     username: configService.get<string>('DB_USERNAME'),
      //     password: configService.get<string>('DB_PASSWORD'),
      //     database: configService.get<string>('DB_NAME'),
      //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
      //     synchronize: true,
      // }),
      useFactory: () => {
        const isProd = process.env.NODE_ENV === 'production';
        return isProd
          ? {
              type: 'mysql',
              host: process.env.DB_HOST,
              port: parseInt(process.env.DB_PORT ?? '3306'),
              username: process.env.DB_USERNAME,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_NAME,
              entities: [__dirname + '/**/*.entity{.ts,.js}'],
              synchronize: true,
              autoLoadEntities: true,
            }
          : {
              type: 'sqlite',
              database: 'dev.db',
              entities: [__dirname + '/**/*.entity{.ts,.js}'],
              synchronize: true,
              autoLoadEntities: true,
            };
      },
      inject: [ConfigService],
    }),

    TypeOrmModule.forFeature([AuthUser]),
  ],
  controllers: [AuthController],
  providers: [AuthService, userClientProvider],
  exports: [],
})
export class AuthModule {}
