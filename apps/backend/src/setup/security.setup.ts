import helmet from 'helmet';
import * as csurf from 'csurf';
import { INestApplication } from '@nestjs/common';

import { AppModule } from 'src/app.module';
import { ConfigService } from '@nestjs/config';
import { INodeConfig } from '@/helpers/configs/config.interfaces';
import { Environment } from '@/helpers/constants/environments';
// import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { PrismaService } from '@/services/prisma/prisma.service';
import { Logger } from '@nestjs/common';
// import otelSDK from './tracing.setup';
// import { LockService } from '@getlarge/nestjs-tools-lock';
import { doubleCsrf } from 'csrf-csrf';

export function securitySetup(app: NestExpressApplication) {
  app.use(helmet());

  // const {
  //   invalidCsrfTokenError, // This is provided purely for convenience if you plan on creating your own middleware.
  //   generateToken, // Use this in your routes to generate and provide a CSRF hash, along with a token cookie and token.
  //   validateRequest, // Also a convenience if you plan on making your own middleware.
  //   doubleCsrfProtection, // This is the default CSRF protection middleware.
  // } = doubleCsrf({
  //   getSecret: app.get(ConfigService<ICookiesConfig>).get('COOKIES_KEY'),
  // });
  // app.use(doubleCsrfProtection);

  app.disable('x-powered-by');

  app.useBodyParser('json', { limit: '100kb' });

  app.enableCors({
    methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH'],
    origin:
      app.get(ConfigService<INodeConfig>).get('APP_ENV') ===
      Environment.Development
        ? `${app.get(ConfigService<INodeConfig>).get('DEV_FRONTEND_URL')}`
        : `${app.get(ConfigService<INodeConfig>).get('PROD_FRONTEND_URL')}`,

    credentials: true,
  });

  process.on('SIGTERM', () => {
    new Logger().fatal('SIGTERM signal received. 💥');
    const prisma = app.get(PrismaService);
    // Log information here in DB

    app.getHttpServer().close((err) => {
      prisma.enableShutdownHooks(app);

      // CLosing WebSockets & SSE & Requests that have header connection: keep-live
      app.getHttpServer().closeAllConnections();

      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    new Logger().fatal('SIGINT signal received. 💥');
    const prisma = app.get(PrismaService);
    // Log information here in DB

    app.getHttpServer().close((err) => {
      prisma.enableShutdownHooks(app);

      // CLosing WebSockets & SSE & Requests that have header connection: keep-live
      app.getHttpServer().closeAllConnections();

      process.exit(0);
    });
  });
}
