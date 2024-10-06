import { RolePermission } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { IRolePermissionRepository } from './role-permissions.interface';
export class RolePermissionRepository implements IRolePermissionRepository {
  constructor(private readonly prismaService: PrismaService) {}
  findAll(): Promise<RolePermission[]> {
    throw new Error('Method not implemented.');
  }
  findById(_id: number): Promise<RolePermission | null> {
    throw new Error('Method not implemented.');
  }
  create(
    _rolePermissionData: Partial<RolePermission>,
  ): Promise<RolePermission> {
    throw new Error('Method not implemented.');
  }
  update(
    _id: number,
    _rolePermissionData: Partial<RolePermission>,
  ): Promise<RolePermission> {
    throw new Error('Method not implemented.');
  }
  delete(_id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
