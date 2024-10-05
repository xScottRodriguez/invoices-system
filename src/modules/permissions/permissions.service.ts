import { Injectable } from '@nestjs/common';
import { Permission } from '@prisma/client';

import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionsRepository } from './repository';

@Injectable()
export class PermissionsService {
  constructor(private readonly permissionRepository: PermissionsRepository) {}
  create(_createPermissionDto: CreatePermissionDto): string {
    return 'This action adds a new permission';
  }

  findAll(): string {
    return `This action returns all permissions`;
  }

  findOne(id: number): string {
    return `This action returns a #${id} permission`;
  }

  update(id: number, _updatePermissionDto: UpdatePermissionDto): string {
    return `This action updates a #${id} permission`;
  }

  remove(id: number): string {
    return `This action removes a #${id} permission`;
  }
  getPermissionsForRole(roleId: number): Promise<Permission[]> {
    return this.permissionRepository.getPermissionsForRole(roleId);
  }
}
