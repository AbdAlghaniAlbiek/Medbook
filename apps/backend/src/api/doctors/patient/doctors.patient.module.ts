import { CommonModule } from '@/helpers/modules/common.module';
import { DoctorsPatientService } from './doctors.patient.service';
import { DoctorsPatientController } from './doctors.patient.controller';

@CommonModule({
  controllers: [DoctorsPatientController],
  providers: [DoctorsPatientService],
})
export class DoctorsPatientModule {}
