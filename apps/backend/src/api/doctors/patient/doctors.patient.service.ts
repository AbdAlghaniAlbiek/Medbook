import { EntityFilter, GetSuccessResponse } from '@/helpers/dto/pagination.dto';
import { omit } from '@/helpers/shared/object-operations';
import {
  checkEntityExist,
  paginateEntities,
} from '@/services/prisma/prisma.helper';
import { PrismaService } from '@/services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@repo/db';
import { SuccessResponse } from '@repo/shared';

@Injectable()
export class DoctorsPatientService {
  constructor(private prisma: PrismaService) {}

  async getPaginated(info: EntityFilter) {
    info.filter = {
      ...info.filter,
      role: 'Doctor',
    } as any;

    const doctors = await paginateEntities<User>(this.prisma, info, 'user');
    doctors.entities = doctors.entities.map((doctor) =>
      omit(doctor, ['password']),
    ) as any;

    return { success: true, data: doctors } as SuccessResponse<
      GetSuccessResponse<User>
    >;
  }

  async getOne(doctorId: number) {
    const doctor = (await checkEntityExist(
      this.prisma,
      'user',
      doctorId,
      'doctor',
    )) as User;
    const modDoctor = omit(doctor, ['password']);

    return { success: true, data: modDoctor } as SuccessResponse<User>;
  }
}
