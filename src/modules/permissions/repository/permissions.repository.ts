import { Permission } from '@prisma/client';

import { PrismaService } from '@/modules/prisma/prisma.service';

import { IPermissionsRepository } from './permissions.interface';

export class PermissionsRepository implements IPermissionsRepository {
  constructor(private readonly prismaService: PrismaService) {}
  findAll(): Promise<Permission[]> {
    throw new Error('Method not implemented.');
  }
  findById(_id: number): Promise<Permission | null> {
    throw new Error('Method not implemented.');
  }
  create(_permissionData: Partial<Permission>): Promise<Permission> {
    throw new Error('Method not implemented.');
  }
  update(
    _id: number,
    _rolePermissionData: Partial<Permission>,
  ): Promise<Permission> {
    throw new Error('Method not implemented.');
  }
  delete(_id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async getPermissionsForRole(roleId: number): Promise<Permission[]> {
    const data = await this.prismaService.rolePermission.findMany({
      where: {
        roleId,
      },
      include: {
        permission: true,
      },
    });

    return data.map(item => item.permission);
  }
}
