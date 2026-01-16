import { EntityFilter, GetSuccessResponse } from '@/helpers/dto/pagination.dto';
import { paginateEntities } from '@/services/prisma/prisma.helper';
import { PrismaService } from '@/services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Appointment, User } from '@repo/db';
import { SuccessResponse } from '@repo/shared';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async getPaginated(info: EntityFilter, user: User) {
    info.filter = {
      ...info.filter,
      ...(user.role === 'Patient'
        ? { createdById: user.id }
        : { assignedToId: user.id }),
    } as any;

    const appointments = await paginateEntities<Appointment>(
      this.prisma,
      info,
      'appointment',
      {
        include:
          user.role === 'Patient' ? { assignedTo: true } : { createdBy: true },
      },
    );

    appointments.entities.forEach((appointment) => {
      if (user.role === 'Patient') {
        delete appointment['assignedTo'].password;
      } else {
        delete appointment['createdBy'].password;
      }
    });

    return { success: true, data: appointments } as SuccessResponse<
      GetSuccessResponse<Appointment>
    >;
  }
}
