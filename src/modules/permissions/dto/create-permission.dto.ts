import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    example: 'create',
    description: 'Permission action',
  })
  @IsString()
  @IsNotEmpty()
  action: string;

  @ApiProperty({
    example: 'Create any resource',
    description: 'Permission description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 1,
    description: 'Resource ID',
  })
  @IsNumber()
  @IsPositive()
  resourceId: number;
}
