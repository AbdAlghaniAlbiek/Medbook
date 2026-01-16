import {
  IBcryptConfig,
  INodeConfig,
} from '@/helpers/configs/config.interfaces';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BcryptConfig {
  constructor(private bcryptConfig: ConfigService<IBcryptConfig>) {}

  get salt() {
    return this.bcryptConfig.get('SALT');
  }
}
