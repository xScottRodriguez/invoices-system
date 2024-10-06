import { Injectable, Logger } from '@nestjs/common';
import { Permission } from '@prisma/client';

import { IPermission } from '@/interfaces/*';
import { PrismaService } from '@/modules/prisma/prisma.service';

import { IPermissionsRepository } from './permissions.interface';

@Injectable()
export class PermissionsRepository implements IPermissionsRepository {
  #logger = new Logger(PermissionsRepository.name);
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Permission[]> {
    return this.prisma.permission.findMany();
  }
  findById(_id: number): Promise<Permission | null> {
    throw new Error('Method not implemented.');
  }
  create(_permissionData: Partial<Permission>): Promise<Permission> {
    const { action, description, resourceId } = _permissionData;
    return this.prisma.permission.create({
      data: {
        action,
        description,
        resourceId,
      },
    });
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
  async getPermissionsForRole(roleId: number): Promise<IPermission[]> {
    const data = await this.prisma.rolePermission.findMany({
      where: {
        roleId,
      },
      include: {
        permission: {
          include: {
            resource: true,
          },
        },
      },
    });

    return data.map(item => item.permission);
  }
}
