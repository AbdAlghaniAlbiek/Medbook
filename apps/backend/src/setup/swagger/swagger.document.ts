import { DoctorsModule } from '@/api/modules/doctors.module';
import { PatientsModule } from '@/api/modules/patients.module';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerDocuments {
  static patientsSwaggerDocument(app: INestApplication) {
    return SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Patients APIs')
        .setDescription('This is the visual representation of Patients APIs')
        .addBearerAuth()
        .addSecurityRequirements('bearer')
        .setVersion('1.0')
        .build(),
      {
        deepScanRoutes: true,
        include: [PatientsModule],
      },
    );
  }

  static doctorsSwaggerDocument(app: INestApplication) {
    return SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Doctors APIs')
        .setDescription('This is the visual representation of Doctors APIs')
        .addBearerAuth()
        .addSecurityRequirements('bearer')
        .setVersion('1.0')
        .build(),
      {
        deepScanRoutes: true,
        include: [DoctorsModule],
      },
    );
  }
}
