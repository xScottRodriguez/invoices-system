import { Injectable, Logger } from '@nestjs/common';
import { Role } from '@prisma/client';
import { IPagination } from 'src/common';

import { PaginationService } from '@/modules/prisma/pagination.service';
import { PrismaService } from '@/modules/prisma/prisma.service';

import { IRoleRepository } from './role.interface';

interface IRoleFilters {
  page: number;
  limit: number;
  filters?: { name: string };
  orderBy: 'asc' | 'desc';
}
@Injectable()
export class RoleRepository implements IRoleRepository {
  #logger = new Logger(RoleRepository.name);

  constructor(
    private readonly _prisma: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  findAll({
    limit,
    orderBy,
    page,
    filters,
  }: IRoleFilters): Promise<IPagination<Role>> {
    const where = filters?.name ? { name: { contains: filters.name } } : {};

    return this.paginationService.paginate<Role>(this._prisma.role, {
      where,
      limit,
      orderBy: { name: orderBy },
      page,
    });
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
