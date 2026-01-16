import { PrismaClient } from '@repo/db';
import { PrismaService } from './prisma.service';
import { Environment } from '@/helpers/constants/environments';
// import { LocaleField, QueryLocaleField } from '@/helpers/dto/localField.dto';
import { PrismaModels } from './prisma-models.type';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EntityFilter } from '@/helpers/dto/pagination.dto';
// import { getServerIP } from '@/helpers/server/ipAddress';

export async function checkEntityExist(
  prisma: PrismaService,
  model: PrismaModels,
  id: number,
  modelSingleName: string,
  meta?: { include: any },
) {
  const entity = await prisma[model]['findUnique']({
    where: { id },
    ...(meta?.include && { include: { ...meta?.include } }),
  });
  if (!entity) {
    throw new NotFoundException(`${modelSingleName} not found`);
  }

  return entity;
}

export function getPrismaModels() {
  const models: PrismaModels[] = [];

  Object.keys(PrismaClient).forEach((prop) => {
    if (prop !== '$extends') models.push(prop as PrismaModels);
  });

  return models;
}

export async function checkDeletedEntity(
  prisma: PrismaService,
  model: PrismaModels,
  modelSingleName: string,
  where: any,
  include?: any,
) {
  const entity = await prisma[model]['findFirst']({
    where: { ...where },
    include: { ...include },
  });
  if (entity.isDeleted || entity.deletedAt) {
    throw new BadRequestException(`${modelSingleName} is deleted`);
  }
}

export async function restoreEntity(
  prisma: PrismaService,
  model: PrismaModels,
  id: number,
) {
  const entity = await prisma[model]['update']({
    where: { id },
    data: { isDeleted: false, deletedAt: null },
  });

  return entity;
}

export async function softDeleteEntity(
  prisma: PrismaService,
  model: PrismaModels,
  id: number,
) {
  const entity = await prisma[model]['update']({
    where: { id },
    data: { isDeleted: true, deletedAt: new Date() },
  });

  return entity;
}

export async function paginateEntities<TResponse>(
  prisma: PrismaService,
  info: EntityFilter,
  model: PrismaModels,
  meta?: { include?: any; orderBy?: any },
): Promise<{
  entities: TResponse[];
  meta: { count: number; page: number };
}> {
  const page = info?.pagination?.page ?? 1;
  const limit = info?.pagination?.limit ?? 25;
  const offset = (page - 1) * limit;

  const entities = await prisma[model]['findMany']({
    ...(meta?.include && { include: { ...meta?.include } }),
    ...(info?.filter && { where: { ...info?.filter } }),
    ...(info?.pagination && {
      skip: offset,
      take: limit,
    }),
    ...(info?.order && {
      orderBy: info?.order?.field
        ? {
            [info?.order?.field]: info?.order?.direction ?? 'desc',
          }
        : {
            createdAt: 'asc',
          },
    }),
  });

  const allEntities = await prisma[model]['findMany']({
    ...(info?.filter && { where: { ...info?.filter } }),
  });

  return {
    entities,
    meta: {
      count: allEntities.length,
      page,
    },
  };
}
