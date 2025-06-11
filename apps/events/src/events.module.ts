import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from './events.entity';

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: 'apps/events/.env',
      }),
      TypeOrmModule.forRootAsync({
        useFactory: () => {
          const isProd = process.env.NODE_ENV === 'production';
          return !isProd
            ? {
                type: 'mysql',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT ?? '3306'),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [Event],
                synchronize: true,
                autoLoadEntities: true,
              }
            : {
                type: 'sqlite',
                database: 'dev.db',
                entities: [Event],
                synchronize: true,
                autoLoadEntities: true,
          }}
      }),
      TypeOrmModule.forFeature([Events]),
    ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
