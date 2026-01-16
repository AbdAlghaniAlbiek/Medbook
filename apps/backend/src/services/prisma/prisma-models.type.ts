import { PrismaClient } from '@repo/db';

export type PrismaModels = Exclude<
  keyof Omit<
    PrismaClient,
    | '$disconnect'
    | '$connect'
    | '$executeRaw'
    | '$queryRaw'
    | '$transaction'
    | '$on'
    | '$use'
    | 'disconnect'
    | 'connect'
    | 'executeRaw'
    | 'queryRaw'
    | 'transaction'
    | 'on'
    | '$executeRawUnsafe'
    | '$queryRawUnsafe'
    // | '$extends'
  >,
  symbol
>;
