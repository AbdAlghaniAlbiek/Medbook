import { PrismaService } from '@/services/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginAuthDto, RegisterAuthDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { BcryptConfig } from '@/services/config/bcrypt.config';
import { ConfigService } from '@nestjs/config';
import { IJwtConfig } from '@/helpers/configs/config.interfaces';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as bcrypt from 'bcrypt';
import { SuccessResponse } from '@repo/shared';
import { User } from '@repo/db';
import { omit } from '@/helpers/shared/object-operations';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private bcryptConfig: BcryptConfig,
    private jwtConfig: ConfigService<IJwtConfig>,
    private eventEmitter: EventEmitter2,
  ) {}

  async generateTokens(payload) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.get('JWT_SECRET_KEY_PUBLIC'),
      algorithm: this.jwtConfig.get('JWT_ALGORITHM'),
      expiresIn: this.jwtConfig.get('JWT_EXPIRES_IN_PUBLIC'),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.get('JWT_SECRET_KEY_PRIVATE'),
      algorithm: this.jwtConfig.get('JWT_ALGORITHM'),
      expiresIn: this.jwtConfig.get('JWT_EXPIRES_IN_PRIVATE'),
    });

    return { accessToken, refreshToken };
  }

  async hashingPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, this.bcryptConfig.salt);

    return hashedPassword;
  }

  async register(data: RegisterAuthDto) {
    console.log(data);

    const isEmailAlreadyExist = await this.prisma.user.findFirst({
      where: { email: data.email },
    });
    if (isEmailAlreadyExist) {
      throw new BadRequestException('There is another user with same email');
    }

    const { confirmPassword, password, ...restData } = data;
    const hashedPassword = await this.hashingPassword(password);

    console.log(hashedPassword);

    const createdUser = await this.prisma.user.create({
      data: { ...restData, password: hashedPassword },
    });

    const { accessToken, refreshToken } =
      await this.generateTokens(createdUser);

    const modUser = omit(createdUser, ['password']);
    return {
      data: { user: modUser, accessToken, refreshToken },
      success: true,
    } as SuccessResponse<{
      user: User;
      accessToken: string;
      refreshToken: string;
    }>;
  }

  async login(data: LoginAuthDto) {
    const isUserExist = await this.prisma.user.findFirst({
      where: { email: data.email },
    });
    if (!isUserExist) {
      throw new BadRequestException(`Your email or password incorrect`);
    }

    const isValidPassword = await bcrypt.compare(
      data.password,
      isUserExist.password,
    );
    if (!isValidPassword) {
      throw new BadRequestException(`Your email or password incorrect`);
    }

    const { accessToken, refreshToken } =
      await this.generateTokens(isUserExist);

    const modUser = omit(isUserExist, ['password']);

    return {
      data: { user: modUser, accessToken, refreshToken },
      success: true,
    } as SuccessResponse<{
      user: User;
      accessToken: string;
      refreshToken: string;
    }>;
  }

  authMe(user: User) {
    const modUser = omit(user, ['password']);
    return { success: true, data: modUser } as SuccessResponse<User>;
  }
}
