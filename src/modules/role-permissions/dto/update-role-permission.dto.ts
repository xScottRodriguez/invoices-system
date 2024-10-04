import { PartialType } from '@nestjs/swagger';
import { CreateRolePermissionDto } from './create-role-permission.dto';

export class UpdateRolePermissionDto extends PartialType(
  CreateRolePermissionDto,
) {}
