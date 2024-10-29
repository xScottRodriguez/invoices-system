import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  HttpStatus,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IPagination, ResponseDto } from 'src/common';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';
import { ResponseHandler } from 'src/common/response.handler';
import { Action, Resource } from 'src/enums';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

import { CheckActionAndResource } from '../role-permissions/casl/policies.decorator';
import { PoliciesGuard } from '../role-permissions/casl/policies.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { FilterRoleDto } from './dto/filter.dto';
import { UpdateAndRemoveRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';

@ApiTags('roles')
@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    private readonly response: ResponseHandler,
  ) {}
  @CheckActionAndResource(Action.create, Resource.roles)
  @Post()
  async create(
    @Body() createRoleDto: CreateRoleDto,
  ): Promise<ResponseDto<Role>> {
    const response: Role = await this.rolesService.create(createRoleDto);
    return this.response.success<Role>(
      HttpStatus.CREATED,
      response,
      'Role created',
    );
  }
  @CheckActionAndResource(Action.read, Resource.roles)
  @Get()
  findAll(
    @Query() pagination: PaginationQueryDto<FilterRoleDto>,
  ): Promise<IPagination<Role>> {
    return this.rolesService.findAll(pagination);
  }

  @CheckActionAndResource(Action.read, Resource.roles)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto<Role | null>> {
    const role: Role | null = await this.rolesService.findOne(+id);
    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }

    return this.response.success<Role>(HttpStatus.OK, role, 'Role found');
  }

  @CheckActionAndResource(Action.update, Resource.roles)
  @Patch('/assign-permissions/:roleId')
  async update(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Body() updateAndRemoveRoleDto: UpdateAndRemoveRoleDto,
  ): Promise<ResponseDto<string>> {
    await this.rolesService.update(roleId, updateAndRemoveRoleDto);
    return this.response.success<string>(HttpStatus.OK, null, 'Role updated');
  }
  @CheckActionAndResource(Action.delete, Resource.roles)
  @Delete('/remove-permissions/:roleId')
  async removePermissions(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Body() updateAndRemoveRoleDto: UpdateAndRemoveRoleDto,
  ): Promise<ResponseDto<string>> {
    await this.rolesService.removePermissions(
      roleId,
      updateAndRemoveRoleDto.permissions,
    );
    return this.response.success<string>(
      HttpStatus.OK,
      null,
      'Permissions removed',
    );
  }
  @CheckActionAndResource(Action.delete, Resource.roles)
  @Delete(':id/toogle-active')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseDto<string>> {
    await this.rolesService.softDelete(id);
    return this.response.success<string>(HttpStatus.OK, null, 'Role deleted');
  }
}
