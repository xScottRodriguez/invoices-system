// src/common/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const originalResponse = exception.getResponse();
    const errorResponse = {
      statusCode: status,
      message: exception.message,
      errors: this.formatErrors(originalResponse, exception.message),
    };

    response.status(status).json(errorResponse);
  }
  private formatErrors(originalResponse: any, message: string): unknown {
    if (typeof originalResponse === 'string') {
      return originalResponse === message ? null : originalResponse;
    }

    if (typeof originalResponse === 'object') {
      return { ...originalResponse, message: undefined };
    }

    return originalResponse;
  }
}
