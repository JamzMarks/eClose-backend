import { Module } from '@nestjs/common';
import { MailService } from './services/mail.service';
import { MailController } from './controllers/mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'apps/mail/.env' }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log('MAIL_HOST:', configService.get('MAIL_HOST'));
        console.log('MAIL_USER:', configService.get('MAIL_USER'));
        console.log('MAIL_PASSWORD:', configService.get('MAIL_PASSWORD'));
        console.log('MAIL_FROM1:', configService.get('MAIL_FROM'));
        return {
          transport: {
            host: configService.get<string>('MAIL_HOST'),
            port: configService.get<number>('MAIL_PORT'),
            // secure: configService.get<boolean>("MAIL_SECURE"), // true for 465, false for other ports
            secure: false, // Use false for testing, true for production with SSL
            auth: {
              user: configService.get<string>('MAIL_USER'),
              pass: configService.get<string>('MAIL_PASSWORD'),
            },
          },
          defaults: {
            from: `"No Reply" <${configService.get<string>('MAIL_FROM')}>`,
          },
        };
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [],
})
export class MailModule {}
