import {
  Body,
  HttpCode,
  HttpStatus,
  Injectable,
  Param,
  ParseIntPipe,
  Patch,
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
import { AppointmentsDoctorService } from './appointments.doctor.service';
import { CurrentUser } from '@/helpers/decorators/current-user.decorator';

@UseGuards(AuthenticationGuard, AuthorizationGuard(['Doctor']))
@ApiController('appointments', 1)
export class AppointmentsDoctorsController extends AppointmentsController {
  constructor(private appointmentService: AppointmentsDoctorService) {
    super(appointmentService);
  }

  @Patch(':appointmentId/confirm')
  @HttpCode(HttpStatus.OK)
  async confirm(
    @Param('appointmentId', ParseIntPipe) appointmentId: number,
    @CurrentUser() user: User,
  ) {
    return await this.appointmentService.confirm(appointmentId, user);
  }

  @Patch(':appointmentId/reject')
  @HttpCode(HttpStatus.OK)
  async reject(
    @Param('appointmentId', ParseIntPipe) appointmentId: number,
    @CurrentUser() user: User,
  ) {
    return await this.appointmentService.reject(appointmentId, user);
  }
}
