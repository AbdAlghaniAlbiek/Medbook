import {
  Abstract,
  applyDecorators,
  DynamicModule,
  ForwardReference,
  Module,
  ModuleMetadata,
  Provider,
  Type,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { IJwtConfig } from '../configs/config.interfaces';

export function CommonModule({
  controllers,
  exports,
  imports,
  providers,
}: {
  exports?: Array<
    | DynamicModule
    | Promise<DynamicModule>
    | string
    | symbol
    | Provider
    | ForwardReference
    | Abstract<any>
    | Function
  >;
  imports?: (
    | Type<any>
    | DynamicModule
    | Promise<DynamicModule>
    | ForwardReference<any>
  )[];
  providers?: Provider[];
  controllers?: Type<any>[];
}) {
  const mainImports = [JwtModule.register({})];
  const importss =
    imports && imports?.length > 0
      ? [...mainImports, ...imports]
      : [...mainImports];

  return applyDecorators(
    Module({
      exports: exports as any,
      controllers,
      imports: importss,
      providers,
    }),
  );
}
