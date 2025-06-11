import { Module } from '@nestjs/common';
import { VenueController } from './venue.controller';
import { VenueService } from './venue.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venue } from './venue.entity';

console.log(process.env.DB_USERNAME)
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/venue/.env'
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
              entities: [Venue],
              synchronize: true,
              autoLoadEntities: true,
            }
          : {
              type: 'sqlite',
              database: 'dev.db',
              entities: [Venue],
              synchronize: true,
              autoLoadEntities: true,
        }}
    }),
    TypeOrmModule.forFeature([Venue]),
  ],
  controllers: [VenueController],
  providers: [VenueService
  ],
})
export class VenueModule {}
