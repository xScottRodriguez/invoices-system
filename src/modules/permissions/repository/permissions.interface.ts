import { Permission } from '@prisma/client';

export interface IPermissionsRepository {
  findAll(): Promise<Permission[]>;

  findById(id: number): Promise<Permission | null>;

  create(permissionData: Partial<Permission>): Promise<Permission>;

  update(
    id: number,
    rolePermissionData: Partial<Permission>,
  ): Promise<Permission>;
  delete(id: number): Promise<void>;
}
