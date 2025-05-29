import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { EventModule } from './modules/events/event.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const isProd = process.env.NODE_ENV === 'production';
        return isProd ?{
          type: 'mysql',
          host: process.env.DB_HOST, 
          port: parseInt(process.env.DB_PORT ?? '3306'),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD, 
          database: process.env.DB_NAME, 
          entities: [__dirname + '/**/*.entity{.ts,.js}'], 
          synchronize: true,
          autoLoadEntities: true,
        } : {
          type: 'sqlite',
          database: 'dev.db',
          entities: [__dirname + '/**/*.entity{.ts,.js}'], 
          synchronize: true,
          autoLoadEntities: true,
        }
      }
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration available globally
      envFilePath: '.env', // Path to your environment variables file
      ignoreEnvFile: false, // Set to true if you want to ignore the .env file
    }),
    UserModule, EventModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
