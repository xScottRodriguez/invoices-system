import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty({
    example: HttpStatus.CREATED,
    description: 'HTTP status code',
  })
  statusCode: HttpStatus;
  @ApiProperty({
    example: {},
    description: 'Data returned',
  })
  data: T;

  @ApiProperty({
    example: 'User created successfully',
    description: 'Message to the user',
  })
  message: string;
}
