import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class RemovePermissionsDto {
  @ApiProperty({
    description: 'permissions',
    example: [1, 2, 3],
  })
  @IsArray({
    message: 'permissions must be an array of numbers',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { each: true },
  )
  permissions: number[];
}
