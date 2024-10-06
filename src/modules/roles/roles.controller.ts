import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto): string {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll(): string {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): string {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return this.rolesService.remove(+id);
  }
}
