import { INodeConfig } from '@/helpers/configs/config.interfaces';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NodeConfig {
  constructor(private nodeConfig: ConfigService<INodeConfig>) {}

  get appEnvironment() {
    return this.nodeConfig.get('APP_ENV');
  }

  get appPort() {
    return this.nodeConfig.get('APP_PORT');
  }
}
