import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ServiceConfig } from '@roulette/common/lib/services/config/service.config';
import { Environment } from '@roulette/common/lib/types';
import { ServiceModule } from './service.module';

async function bootstrap() {
  const app = await NestFactory.create(ServiceModule);
  const config = app.get(ServiceConfig);
  const logger: Logger = new Logger('main');
  app.useLogger(logger);

  app.setGlobalPrefix(config.globalPrefix);
  const validationOptions = {
    // skipMissingProperties: true,
    validationError: { target: false },
  };
  app.useGlobalPipes(new ValidationPipe(validationOptions));

  if (config.environment === Environment.Development) {
    const documentOptions = new DocumentBuilder()
      .setTitle(config.swagger.Name)
      .setDescription(config.swagger.Description)
      .setVersion(config.swagger.Version)
      .setBasePath(config.globalPrefix)
      .build();
    const document = SwaggerModule.createDocument(app, documentOptions);
    SwaggerModule.setup('swagger', app, document);
  }

  const port = config.port || 3001;
  await app.listen(port);
  logger.log(`Server listening on port ${port}`, bootstrap.name);
}

bootstrap();
