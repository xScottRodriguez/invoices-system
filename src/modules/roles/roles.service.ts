import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Role } from '@prisma/client';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './repository/role.repository';

@Injectable()
export class RolesService {
  #logger = new Logger(RolesService.name);
  constructor(private readonly roleRepository: RoleRepository) {}
  create(_createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleRepository.create({
      name: _createRoleDto.name,
    });
  }

  findAll(): string {
    return `This action returns all roles`;
  }

  findOne(id: number): Promise<Role | null> {
    return this.roleRepository.findById(id);
  }

  async update(id: number, _updateRoleDto: UpdateRoleDto): Promise<void> {
    const role: Role | null = await this.roleRepository.findById(id);
    if (!role) {
      throw new UnprocessableEntityException(`Role with id ${id} not found`);
    }
    try {
      await this.roleRepository.asignPermissions(
        id,
        _updateRoleDto.permissions,
      );
    } catch (error) {
      this.#logger.error(error.message, error.stack);
      throw new InternalServerErrorException("Can't update role");
    }
  }

  remove(id: number): string {
    return `This action removes a #${id} role`;
  }
}
