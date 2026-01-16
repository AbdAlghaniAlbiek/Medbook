export class SuccessResponse<T> {
  success: boolean;
  data: T;
}

export class ErrorResponse {
  success: boolean;
  error: string | { [prop: string]: string[] };
  details?: Record<string, any>;
}
