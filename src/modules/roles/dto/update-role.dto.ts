import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';

export class UpdateAndRemoveRoleDto {
  @IsArray()
  @Type(() => Number)
  permissions: number[];
}
