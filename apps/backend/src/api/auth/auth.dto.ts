import { LoginSchema, RegisterSchema } from '@repo/shared';
import { createZodDto } from 'nestjs-zod';

export class LoginAuthDto extends createZodDto(LoginSchema) {}
export class RegisterAuthDto extends createZodDto(RegisterSchema) {}
