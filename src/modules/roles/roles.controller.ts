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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IPagination } from 'src/common';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';

import { CreateRoleDto } from './dto/create-role.dto';
import { FilterRoleDto } from './dto/filter.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll(
    @Query() pagination: PaginationQueryDto<FilterRoleDto>,
  ): Promise<IPagination<Role>> {
    return this.rolesService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Role | null> {
    return this.rolesService.findOne(+id);
  }

  @Patch('/assign-permissions/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<string> {
    await this.rolesService.update(id, updateRoleDto);
    return 'Role updated successfully';
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return this.rolesService.remove(+id);
  }
}
