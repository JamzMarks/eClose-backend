import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { MailService } from "../services/mail.service";
import { EventPattern } from "@nestjs/microservices";
import { PayloadNotificationDto } from "../dto/payloadNotification.dto";

interface EmailParam {
    email: string;
}

@Controller("mail")
export class MailController {
    constructor( private readonly mailService: MailService){}

    @EventPattern('user-created')
    async verifyEmailNotification(user: PayloadNotificationDto): Promise<void> {
        try {
            await this.mailService.verifyEmailNotification(user);
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    }

    @Post('testsend')
    async testSend(@Body() email: EmailParam): Promise<any> {  

        console.log('Received email for test send:', email.email);
        try {
            return this.mailService.testSend(email.email);
        } catch (error) {
            console.error('Error in testSend:', error);
        }
        
    }

    @Get('health')
    async checkHealth() {  
        return this.mailService.checkHealth();
    }
  // This controller can handle HTTP requests related to notifications
  // For example, you can define endpoints to send notifications, get notification history, etc.
}