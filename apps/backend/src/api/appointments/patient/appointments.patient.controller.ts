import {
  Body,
  HttpCode,
  HttpStatus,
  Injectable,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from '../appointments.service';
import { PrismaService } from '@/services/prisma/prisma.service';
import { AppointmentCreateDto } from '../appointments.dto';
import { checkEntityExist } from '@/services/prisma/prisma.helper';
import { Appointment, User } from '@repo/db';
import { SuccessResponse } from '@repo/shared';
import { ApiController } from '@/helpers/decorators/swagger.decorator';
import { AuthenticationGuard } from '@/api/auth/guard/authentication.guard';
import { AuthorizationGuard } from '@/api/auth/guard/authorization.guard';
import { AppointmentsController } from '../appointments.controller';
import { AppointmentsPatientService } from './appointments.patient.service';
import { CurrentUser } from '@/helpers/decorators/current-user.decorator';

@UseGuards(AuthenticationGuard, AuthorizationGuard(['Patient']))
@ApiController('appointments', 1)
export class AppointmentsPatientController extends AppointmentsController {
  constructor(private appointmentService: AppointmentsPatientService) {
    super(appointmentService);
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  async create(@Body() data: AppointmentCreateDto, @CurrentUser() user: User) {
    return await this.appointmentService.create(data, user);
  }
}
