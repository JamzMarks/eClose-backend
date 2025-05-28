import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { EventModule } from './modules/events/event.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
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
