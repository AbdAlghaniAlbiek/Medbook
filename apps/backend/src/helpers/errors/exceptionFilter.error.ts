import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ZodSerializationException, ZodValidationException } from 'nestjs-zod';
import { ErrorResponse } from '@repo/shared';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger: Logger;
  constructor() {
    this.logger = new Logger();
  }

  catch(
    exception: HttpException | ZodValidationException,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message: any = exception.message;
    const errorName = exception.name;

    const exceptionMessage = {
      message,
      statusCode: status,
    };

    // catch unhandled errors in async calls
    process.on('uncaughtException', (err: Error) => {
      this.logger.log(
        `😱 Uncaught Exception Error: ${err.message}\n${err.stack}`,
      );
      exceptionMessage.message = 'Server Error';
      exceptionMessage.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    });
    process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
      // NOTE: if you receive this error message, most likely there was an error within an
      // unresolved Promise or Observable without .catch() function. Please implement a proper .catch() function!
      this.logger.log(
        `😱 Unhandled Rejection Error: ${reason}\n${reason.stack}`,
      );
      exceptionMessage.message = 'Server Error';
      exceptionMessage.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    });

    if (exception instanceof ZodValidationException) {
      const zodError = exception.getZodError() as any;
      // if (zodError instanceof ZodError) {
      //   this.logger.error(`ZodSerializationException: ${zodError.message}`);
      // }
      const message = {};
      zodError.errors.forEach((err) => {
        const property = (err.path as string[]).join('.');
        if (!message[property]) {
          message[property] = [];
          message[property].push(err.message);
        } else {
          message[property].push(err.message);
        }
      });

      exceptionMessage.message = message;
      exceptionMessage.statusCode = HttpStatus.BAD_REQUEST;
    }

    console.log(exception.stack);

    response.status(status).json({
      error: exceptionMessage.message,
      success: false,
      details: {
        timestamp: new Date().toISOString(),
        path: request.url,
        errorName: errorName,
        statusCode: exceptionMessage.statusCode,
      },
    } as ErrorResponse);
  }
}
