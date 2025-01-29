import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { IPagination, ResponseDto } from 'src/common';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';

import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { FilterRoleDto } from './dto/filter.dto';
import { UpdateAndRemoveRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './repository/role.repository';

@Injectable()
export class RolesService {
  #logger = new Logger(RolesService.name);
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly prisma: PrismaService,
  ) { }
  create(_createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleRepository.create({
      name: _createRoleDto.name,
    });
  }

  findAll(
    pagination: PaginationQueryDto<FilterRoleDto>,
  ): Promise<ResponseDto<Role[]>> {
    const { page, limit, filters, orderBy } = pagination;
    return this.roleRepository.findAll({
      page,
      limit,
      filters,
      orderBy,
    });
  }

  findOne(id: number): Promise<Role | null> {
    return this.roleRepository.findById(id);
  }

  async update(
    roleId: number,
    _updateAndRemoveRoleDto: UpdateAndRemoveRoleDto,
  ): Promise<void> {
    const role: Role | null = await this.roleRepository.findById(roleId);
    if (!role) {
      throw new UnprocessableEntityException(
        `Role with id ${roleId} not found`,
      );
    }
    const permissionsOfRole: number[] =
      await this.roleRepository.findPermissionsByRoleId(roleId);

    // Get the permissions that are not in the role
    const permissionsToCreate: number[] =
      _updateAndRemoveRoleDto.permissions.filter(
        permission => !permissionsOfRole.includes(permission),
      );

    try {
      await this.roleRepository.asignPermissions(roleId, permissionsToCreate);
    } catch (error) {
      this.#logger.error(error.message, error.stack);
      throw new InternalServerErrorException("Can't update role");
    }
  }
  async removePermissions(
    roleId: number,
    permissions: number[],
  ): Promise<void> {
    return await this.roleRepository.removePermissions(roleId, permissions);
  }

  async softDelete(id: number): Promise<Role> {
    const role: Role = await this.roleRepository.findById(id);
    return await this.roleRepository.softDelete(role.id, role.isDeleted);
  }

  async remove(id: number): Promise<void> {
    try {
      this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const permissions: number[] =
          await this.roleRepository.findPermissionsByRoleId(id);
        await this.roleRepository.removePermissions(id, permissions, tx);
        await this.roleRepository.removeRole(id, tx);
      });
    } catch (error) {
      this.#logger.error(error.message, error.stack);
      throw new InternalServerErrorException("Can't delete role");
    }
  }
}
