import { BadRequestException, Injectable } from '@nestjs/common';
import { AppointmentsService } from '../appointments.service';
import { PrismaService } from '@/services/prisma/prisma.service';
import { AppointmentCreateDto } from '../appointments.dto';
import { checkEntityExist } from '@/services/prisma/prisma.helper';
import { Appointment, User } from '@repo/db';
import { SuccessResponse } from '@repo/shared';

@Injectable()
export class AppointmentsDoctorService extends AppointmentsService {
  constructor(private prismaService: PrismaService) {
    super(prismaService);
  }

  async sharedConfirmRejectOperation(appointmentId: number, user: User) {
    await checkEntityExist(
      this.prismaService,
      'appointment',
      appointmentId,
      'appointment',
    );

    const isAppointmentAlignedToDoctor =
      await this.prismaService.appointment.findFirst({
        where: { id: appointmentId, assignedToId: user.id },
      });

    if (!isAppointmentAlignedToDoctor) {
      throw new BadRequestException(`This appointment doesn't assigned to you`);
    }
  }

  async confirm(appointmentId: number, user: User) {
    await this.sharedConfirmRejectOperation(appointmentId, user);

    const updatedAppointment = await this.prismaService.appointment.update({
      where: { id: appointmentId },
      data: { status: 'Accepted' },
    });

    return {
      success: true,
      data: updatedAppointment,
    } as SuccessResponse<Appointment>;
  }

  async reject(appointmentId: number, user: User) {
    await this.sharedConfirmRejectOperation(appointmentId, user);

    const updatedAppointment = await this.prismaService.appointment.update({
      where: { id: appointmentId },
      data: { status: 'Rejected' },
    });

    return {
      success: true,
      data: updatedAppointment,
    } as SuccessResponse<Appointment>;
  }
}
