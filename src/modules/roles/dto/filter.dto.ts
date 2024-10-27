import { IsString } from 'class-validator';

export class FilterRoleDto {
  @IsString()
  name: string;
}
