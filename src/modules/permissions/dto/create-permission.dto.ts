import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  action: string;

  @IsString()
  @IsNotEmpty()
  description: string;
  @IsNumber()
  @IsPositive()
  resourceId: number;
}
