import { CommonModule } from '@/helpers/modules/common.module';
import { Module } from '@nestjs/common';
import { AuthDoctorModule } from '../auth/doctor/auth.doctor.module';
import { RouterModule } from '@nestjs/core';
import { AppointmentsDoctorModule } from '../appointments/doctor/appointments.doctor.module';

const sharedApiDoctorRoutes = 'doctors';

@Module({
  imports: [
    AuthDoctorModule,
    AppointmentsDoctorModule,

    RouterModule.register([
      {
        path: sharedApiDoctorRoutes,
        module: AuthDoctorModule,
      },
      {
        path: sharedApiDoctorRoutes,
        module: AppointmentsDoctorModule,
      },
    ]),
  ],
})
export class DoctorsModule {}
