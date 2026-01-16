import { CommonModule } from '@/helpers/modules/common.module';
import { AppointmentsDoctorsController } from './appointments.doctor.controller';
import { AppointmentsDoctorService } from './appointments.doctor.service';

@CommonModule({
  controllers: [AppointmentsDoctorsController],
  providers: [AppointmentsDoctorService],
})
export class AppointmentsDoctorModule {}
