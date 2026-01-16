export interface IGetSuccessResponse<T> {
  entities: T[];
  meta: IMetaData;
}

interface IMetaData {
  count: number;
  page: number;
}

export class GetSuccessResponse<T> {
  entities: T[] = [];
  meta: IMetaData = { count: 30, page: 1 };
}
