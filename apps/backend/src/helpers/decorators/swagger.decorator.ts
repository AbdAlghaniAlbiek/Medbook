import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export function ApiController(path: string, version: number) {
  return applyDecorators(
    ApiTags(path),
    Controller({ path, version: version.toString() }),
  );
}
