import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';

export class UpdateRoleDto {
  @IsArray()
  @Type(() => Number)
  permissions: number[];
}
