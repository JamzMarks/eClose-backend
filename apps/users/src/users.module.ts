import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { UserService } from "./users.service";
import { UserController } from "./users.controller";
import { User } from "./types/user.entity";


@Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: 'apps/users/.env',
      }),
      TypeOrmModule.forRootAsync({
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
                entities: [User],
                synchronize: true,
                autoLoadEntities: true,
              }
            : {
                type: 'sqlite',
                database: 'dev.db',
                entities: [User],
                synchronize: true,
                autoLoadEntities: true,
          }}
      }),
      TypeOrmModule.forFeature([User]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}