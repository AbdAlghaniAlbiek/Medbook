import { CommonModule } from '@/helpers/modules/common.module';
import { AppointmentsPatientController } from './appointments.patient.controller';
import { AppointmentsPatientService } from './appointments.patient.service';

@CommonModule({
  controllers: [AppointmentsPatientController],
  providers: [AppointmentsPatientService],
})
export class AppointmentsPatientModule {}
