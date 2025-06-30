import { NestFactory } from '@nestjs/core';
import { MapModule } from './map.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(MapModule)
    const config = new DocumentBuilder()
    .setTitle('Map Service')
    .setDescription('Geolocation queries for events and venues')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3001);
  console.log('Map MS rodando na porta 3001 🐇');
}
bootstrap();