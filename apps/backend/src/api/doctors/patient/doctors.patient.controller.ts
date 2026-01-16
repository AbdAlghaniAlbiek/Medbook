import { ApiController } from '@/helpers/decorators/swagger.decorator';
import { DoctorsPatientService } from './doctors.patient.service';
import {
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthenticationGuard } from '@/api/auth/guard/authentication.guard';
import { AuthorizationGuard } from '@/api/auth/guard/authorization.guard';
import { EntityFilter } from '@/helpers/dto/pagination.dto';
import { ZodValidationPipe } from 'nestjs-zod';

@UseGuards(AuthenticationGuard, AuthorizationGuard(['Patient']))
@ApiController('doctors', 1)
export class DoctorsPatientController {
  constructor(private service: DoctorsPatientService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getPaginated(@Query() info: EntityFilter) {
    return await this.service.getPaginated(info);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getOne(id);
  }
}
