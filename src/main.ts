import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import { AppModule } from './config/app/app.module';
import OpenApi from './config/openapi';
import './tracing';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.enableCors();
  app.use(helmet());
  app.useLogger(app.get(Logger));

  if (process.env.NODE_ENV !== 'production') {
    OpenApi(app);
  }

  await app.listen(parseInt(process.env.PORT || '3000', 10));
}
bootstrap();
