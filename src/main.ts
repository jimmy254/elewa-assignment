import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  const config = app.get(ConfigService);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Elewa Asignment')
    .setDescription(' Elewa swagger docs')
    .setVersion('1.0')
    .addTag('elewa-assignment')
    .build();

  const swaggerOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    swaggerOptions,
  );
  SwaggerModule.setup('swagger', app, swaggerDocument);
  const port = config.get('port');
  await app.listen(port, async () => {
    console.log('Elewa servers listening on', await app.getUrl());
  });
}
bootstrap();
