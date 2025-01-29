// src/common/response.handler.ts
import { HttpStatus, Injectable } from '@nestjs/common';

import { ResponseDto } from './dto';

@Injectable()
export class ResponseHandler {
  send<T>(statusCode: HttpStatus, data: T, messages: string[]): ResponseDto<T> {
    return {
      statusCode,
      data,
      messages,
    };
  }
}
