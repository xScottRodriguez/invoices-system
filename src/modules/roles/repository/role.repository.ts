import { Injectable, Logger } from '@nestjs/common';
import { Role } from '@prisma/client';

import { PrismaService } from '@/modules/prisma/prisma.service';

import { IRoleRepository } from './role.interface';

@Injectable()
export class RoleRepository implements IRoleRepository {
  #logger = new Logger(RoleRepository.name);

  constructor(private readonly _prisma: PrismaService) {}

  // TODO: IMPLEMENTS PAGINATION
  findAll(): Promise<Role[]> {
    return this._prisma.role.findMany();
  }
  findById(id: number): Promise<Role | null> {
    return this._prisma.role.findUnique({ where: { id } });
  }
  create(roleData: Partial<Role>): Promise<Role> {
    return this._prisma.role.create({
      data: {
        name: roleData.name,
      },
    });
  }
  update(id: number, roleData: Partial<Role>): Promise<Role> {
    return this._prisma.role.update({
      where: { id },
      data: roleData,
    });
  }
  async delete(id: number): Promise<void> {
    await this._prisma.role.delete({ where: { id } });
    return;
  }

  async asignPermissions(id: number, permissions: number[]): Promise<Role> {
    return this._prisma.role.update({
      where: { id },
      data: {
        permissions: {
          set: permissions.map(permission => ({ id: permission })),
        },
      },
    });
  }
}
