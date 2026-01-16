import { CommonModule } from '@/helpers/modules/common.module';
import { Module } from '@nestjs/common';
import { AuthPatientModule } from '../auth/patient/auth.patient.module';
import { RouterModule } from '@nestjs/core';
import { AppointmentsPatientModule } from '../appointments/patient/appointments.patient.module';
import { DoctorsPatientModule } from '../doctors/patient/doctors.patient.module';

const sharedApiPatientRoutes = 'patients';

@Module({
  imports: [
    AuthPatientModule,
    AppointmentsPatientModule,
    DoctorsPatientModule,

    RouterModule.register([
      {
        path: sharedApiPatientRoutes,
        module: AuthPatientModule,
      },
      {
        path: sharedApiPatientRoutes,
        module: AppointmentsPatientModule,
      },
      {
        path: sharedApiPatientRoutes,
        module: DoctorsPatientModule,
      },
    ]),
  ],
})
export class PatientsModule {}
