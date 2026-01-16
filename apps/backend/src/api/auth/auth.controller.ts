import {
  Body,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from './auth.dto';
import { CurrentUser } from '@/helpers/decorators/current-user.decorator';
import { User } from '@repo/db';
import { PublicAPI } from './guard/meta/public.meta';
import { AuthenticationGuard } from './guard/authentication.guard';
import { ThrottlerGuard } from '@nestjs/throttler';

export class AuthController {
  constructor(private service: AuthService) {}

  @UseGuards(ThrottlerGuard)
  @PublicAPI()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() data: RegisterAuthDto) {
    return await this.service.register(data);
  }

  @UseGuards(ThrottlerGuard)
  @PublicAPI()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: LoginAuthDto) {
    return await this.service.login(data);
  }

  @UseGuards(AuthenticationGuard)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  authMe(@CurrentUser() user: User) {
    return this.service.authMe(user);
  }
}
