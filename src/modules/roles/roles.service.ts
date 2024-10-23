import { Injectable } from '@nestjs/common';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './repository/role.repository';

@Injectable()
export class RolesService {
  constructor(private readonly roleRepository: RoleRepository) {}
  create(_createRoleDto: CreateRoleDto): string {
    return 'This action adds a new role';
  }

  findAll(): string {
    return `This action returns all roles`;
  }

  findOne(id: number): string {
    return `This action returns a #${id} role`;
  }

  update(id: number, _updateRoleDto: UpdateRoleDto): string {
    return `This action updates a #${id} role`;
  }

  remove(id: number): string {
    return `This action removes a #${id} role`;
  }
}
