import { Global, Module } from '@nestjs/common';
import { BcryptConfig } from './bcrypt.config';
import { NodeConfig } from './node.config';

@Global()
@Module({
  providers: [NodeConfig, BcryptConfig],
  exports: [NodeConfig, BcryptConfig],
})
export class CustomConfigModule {}
