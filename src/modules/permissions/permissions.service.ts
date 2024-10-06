import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Permission } from '@prisma/client';

import { IPermission } from '@/interfaces/*';

import { PrismaService } from '../prisma/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionsRepository } from './repository';

@Injectable()
export class PermissionsService {
  #logger = new Logger(PermissionsService.name);
  constructor(
    private readonly permissionRepository: PermissionsRepository,
    private readonly prisma: PrismaService,
  ) {}
  async create(_createPermissionDto: CreatePermissionDto): Promise<Permission> {
    try {
      return await this.permissionRepository.create(_createPermissionDto);
    } catch (error) {
      this.#logger.error({
        message: error.message,
        stack: error.stack,
      });
      throw new InternalServerErrorException('Error creating permission');
    }
  }

  findAll(): Promise<Permission[]> {
    return this.permissionRepository.findAll();
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
  getPermissionsForRole(roleId: number): Promise<IPermission[]> {
    return this.permissionRepository.getPermissionsForRole(roleId);
  }
}
