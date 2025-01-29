import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';


class MetaDto {
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

class LinksDto {
  next: number | null;
  prev: number | null;
}

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
  messages: string[];

  meta?: MetaDto;
  links?: LinksDto;
}
