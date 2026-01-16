import { HttpExceptionFilter } from '@/helpers/errors/exceptionFilter.error';
import {
  INestApplication,
  RequestMethod,
  VersioningType,
} from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { ZodValidationPipe } from 'nestjs-zod';
// import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { join } from 'path';

export function globalSetup(app: INestApplication) {
  app.setGlobalPrefix('api', {
    exclude: [{ method: RequestMethod.GET, path: 'health-check' }],
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(new ZodValidationPipe());

  const uploadFolderExists = existsSync(join(process.cwd(), 'upload'));
  if (!uploadFolderExists) {
    mkdirSync(join(process.cwd(), 'upload'));
  }
}
