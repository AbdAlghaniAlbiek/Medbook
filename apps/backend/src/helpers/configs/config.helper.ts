import { InternalServerErrorException } from '@nestjs/common';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';

export default function envFilePath(path: string): void {
  const envConfig = config({
    path,
  });

  if (envConfig.error) {
    throw new InternalServerErrorException(`${envConfig.error}`);
  }

  expand(envConfig);
}
