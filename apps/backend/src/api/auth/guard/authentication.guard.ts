import { PrismaService } from '@/services/prisma/prisma.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable, retry } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { IJwtConfig } from '@/helpers/configs/config.interfaces';
import { IsPublicAPI } from './meta/public.meta';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private prisma: PrismaService,
    private jwtConfig: ConfigService<IJwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const isPublic = this.reflector.get(IsPublicAPI, context.getHandler());
    if (isPublic) {
      return true as any;
    }

    const token = request.headers.authorization;
    if (!token) {
      throw new UnauthorizedException(`You're unauthenticated`);
    }
    const accessToken = token.split(' ')[1];
    if (!accessToken) {
      throw new UnauthorizedException(`You're unauthenticated`);
    }

    let verifiedToken;
    try {
      verifiedToken = await this.jwtService.verifyAsync(accessToken, {
        algorithms: [this.jwtConfig.get('JWT_ALGORITHM') as any],
        secret: this.jwtConfig.get('JWT_SECRET_KEY_PUBLIC'),
      });
    } catch (err) {
      throw new UnauthorizedException(`You're unauthenticated`);
    }

    const user = await this.prisma.user.findFirst({
      where: { id: verifiedToken.id },
    });
    request['user'] = user;

    return true;
  }
}
