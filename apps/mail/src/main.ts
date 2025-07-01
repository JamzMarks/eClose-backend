import { NestFactory } from "@nestjs/core";
import { MailModule } from "./mail.module";

async function  bootstrap(){
    const app = await NestFactory.create(MailModule);

    app.connectMicroservice({
        transport: "KAFKA",
        options: {
            clientId: "notifications-service",
            brokers: ["localhost:9092"],
        },
        consumer: {
            groupId: "notifications-consumer-group"
        }
    })

    await app.listen(process.env.PORT || 3005);
    console.log("🚀 Notifications API HTTP rodando na porta", process.env.PORT || 3005);
}
bootstrap();
