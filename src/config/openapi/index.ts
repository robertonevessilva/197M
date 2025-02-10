import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('197Mulher API Integração')
    .setDescription('API de Integração do APP 197Mulher')
    .setVersion('1.0')
    .addTag('197Mulher-API')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'X-API-KEY')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);
};
