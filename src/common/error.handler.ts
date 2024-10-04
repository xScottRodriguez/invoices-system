// src/common/error.handler.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorHandler extends HttpException {
  constructor(statusCode: HttpStatus, message: string, errors: any) {
    super({ statusCode, message, errors }, statusCode);
  }
}
