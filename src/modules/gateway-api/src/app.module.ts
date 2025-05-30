import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { EventModule } from './modules/events/event.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
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
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    // EventModule,
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.USER_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.USER_SERVICE_PORT || '3001'),
        },
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.AUTH_SERVICE_PORT || '3002'),
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
