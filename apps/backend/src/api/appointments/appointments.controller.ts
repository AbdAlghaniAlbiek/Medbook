import { EntityFilter } from '@/helpers/dto/pagination.dto';
import { Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CurrentUser } from '@/helpers/decorators/current-user.decorator';
import { User } from '@repo/db';

export class AppointmentsController {
  constructor(private service: AppointmentsService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getPaginated(@Query() info: EntityFilter, @CurrentUser() user: User) {
    return await this.service.getPaginated(info, user);
  }
}
