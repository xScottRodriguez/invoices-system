import { Injectable } from '@nestjs/common';

import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';

@Injectable()
export class RolePermissionsService {
  create(_createRolePermissionDto: CreateRolePermissionDto): string {
    return 'This action adds a new rolePermission';
  }

  findAll(): string {
    return `This action returns all rolePermissions`;
  }

  findOne(id: number): string {
    return `This action returns a #${id} rolePermission`;
  }

  update(
    id: number,
    _updateRolePermissionDto: UpdateRolePermissionDto,
  ): string {
    return `This action updates a #${id} rolePermission`;
  }

  remove(id: number): string {
    return `This action removes a #${id} rolePermission`;
  }
}
