import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { globalSetup } from './setup/globals.setup';
import { SwaggerSetup } from './setup/swagger/swagger.setup';
import { securitySetup } from './setup/security.setup';
import { ConfigService } from '@nestjs/config';
import { INodeConfig } from './helpers/configs/config.interfaces';
import { Environment } from './helpers/constants/environments';
import { appIsRunningLogger } from './helpers/app-logger-info/app-logger-info';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'log', 'warn', 'debug', 'fatal', 'verbose'],
  });

  /**
   *  Global setup:
   *  Global-Prefix
   *  Global-Pipes (ValidationPipe, i18nValidationPipe)
   *  Global-Filter
   *  Versioning
   */
  globalSetup(app);

  /**
   *  Swagger setup:
   *  swagger configuration
   */
  SwaggerSetup(app);

  /**
   *  Setup security
   *  Helmet & CSRF & CORS
   */
  securitySetup(app);

  const port: number =
    app.get(ConfigService<INodeConfig>).get('APP_PORT') || 4000;
  const environment = app.get(ConfigService<INodeConfig>).get('APP_ENV');

  if (environment === Environment.Development) {
    await app.listen(port, '127.0.0.1');
  }

  if (environment === Environment.Production) {
    await app.listen(port);
  }

  appIsRunningLogger({ url: await app.getUrl(), nodeEnv: environment });
}
bootstrap();
