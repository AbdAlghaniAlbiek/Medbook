import { BadRequestException, Injectable } from '@nestjs/common';
import { AppointmentsService } from '../appointments.service';
import { PrismaService } from '@/services/prisma/prisma.service';
import { AppointmentCreateDto } from '../appointments.dto';
import { checkEntityExist } from '@/services/prisma/prisma.helper';
import { Appointment, User } from '@repo/db';
import { SuccessResponse } from '@repo/shared';

@Injectable()
export class AppointmentsPatientService extends AppointmentsService {
  constructor(private prismaService: PrismaService) {
    super(prismaService);
  }

  async create(data: AppointmentCreateDto, user: User) {
    await checkEntityExist(
      this.prismaService,
      'user',
      data.assignedToId,
      'doctor',
    );

    const isAlreadyAssigned = await this.prismaService.appointment.findFirst({
      where: { assignedToId: data.assignedToId, createdById: user.id },
    });
    if (isAlreadyAssigned) {
      throw new BadRequestException(
        `You already assigned appointment to this doctor`,
      );
    }

    const createdAppointment = await this.prismaService.appointment.create({
      data: { ...data, status: 'Pending', createdById: user.id },
    });

    return {
      success: true,
      data: createdAppointment,
    } as SuccessResponse<Appointment>;
  }
}
