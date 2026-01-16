import { ApiController } from '@/helpers/decorators/swagger.decorator';
import { AuthController } from '../auth.controller';
import { AuthPatientService } from './auth.patient.service';

@ApiController('auth', 1)
export class AuthPatientController extends AuthController {
  constructor(private authService: AuthPatientService) {
    super(authService);
  }
}
