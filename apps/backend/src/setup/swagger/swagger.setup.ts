import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerDocuments } from './swagger.document';
import { INestApplication } from '@nestjs/common';
import { Environment } from '@/helpers/constants/environments';
import { ConfigService } from '@nestjs/config';
import { INodeConfig } from '@/helpers/configs/config.interfaces';
import { cleanupOpenApiDoc } from 'nestjs-zod';

export function SwaggerSetup(app: INestApplication) {
  SwaggerModule.setup(
    'swagger/api/patients',
    app,
    cleanupOpenApiDoc(SwaggerDocuments.patientsSwaggerDocument(app)),
  );

  SwaggerModule.setup(
    'swagger/api/doctors',
    app,
    cleanupOpenApiDoc(SwaggerDocuments.doctorsSwaggerDocument(app)),
  );
}
