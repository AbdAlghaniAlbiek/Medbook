import { ApiController } from '@/helpers/decorators/swagger.decorator';
import { AuthController } from '../auth.controller';
import { AuthDoctorService } from './auth.doctor.service';

@ApiController('auth', 1)
export class AuthDoctorController extends AuthController {
  constructor(private authService: AuthDoctorService) {
    super(authService);
  }
}
