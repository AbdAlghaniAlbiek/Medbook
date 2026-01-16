import { AppointmentSchema } from '@repo/shared';
import { createZodDto } from 'nestjs-zod';

export class AppointmentCreateDto extends createZodDto(AppointmentSchema) {}
