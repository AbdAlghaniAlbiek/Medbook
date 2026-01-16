import { PaginationSchema } from '@repo/shared';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export class EntityFilter extends createZodDto(PaginationSchema) {}

export interface GetSuccessResponse<T> {
  entities: T[];
  meta: IMetaData;
}

interface IMetaData {
  count: number;
  page: number;
}
