import { Injectable } from '@nestjs/common';

import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { RolePermissionRepository } from './repository/role-permissions.repository';
import { IRolePermission } from './types';
@Injectable()
export class RolePermissionsService {
  constructor(private readonly repository: RolePermissionRepository) {}
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
  async getPermissionsForUser(id: number): Promise<IRolePermission[]> {
    const { role } = await this.repository.getPermissionsForUser(id);
    return role.rolePermissions;
  }
}
