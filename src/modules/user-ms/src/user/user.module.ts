import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../types/user.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { ConfigModule } from "@nestjs/config";


@Module({
    imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
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