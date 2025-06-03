import { Module } from '@nestjs/common';
import { AppService } from './services/app.service';
// import { EventModule } from './modules/events/event.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './controllers/user.controller';
import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';

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
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URL || 'amqp://localhost:5672'],
        queue: 'user_queue',
        queueOptions: { durable: true },
      },
    },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL || 'amqp://localhost:5672'],
          queue: 'auth_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService],
})
export class AppModule {}
