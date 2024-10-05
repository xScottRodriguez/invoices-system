import { RolePermission } from '@prisma/client';

export interface IRolePermissionRepository {
  findAll(): Promise<RolePermission[]>;
  findById(id: number): Promise<RolePermission | null>;
  create(rolePermissionData: Partial<RolePermission>): Promise<RolePermission>;
  update(
    id: number,
    rolePermissionData: Partial<RolePermission>,
  ): Promise<RolePermission>;
  delete(id: number): Promise<void>;
}
