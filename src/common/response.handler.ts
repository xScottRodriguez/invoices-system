// src/common/response.handler.ts
import { HttpStatus, Injectable } from '@nestjs/common';
import { IResponse } from './interfaces';

@Injectable()
export class ResponseHandler {
  success<T>(statusCode: HttpStatus, data: T, message: string): IResponse<T> {
    return {
      statusCode,
      data,
      message,
    };
  }
}
