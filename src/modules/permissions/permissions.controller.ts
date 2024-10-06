import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/common';
import { ResponseHandler } from 'src/common/response.handler';

import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { PermissionsService } from './permissions.service';

@ApiTags('permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly responseHandler: ResponseHandler,
  ) {}

  @ApiOkResponse({
    description: 'Permission created successfully.',
    type: Permission,
  })
  @ApiBody({ type: CreatePermissionDto })
  @Post()
  create(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    return this.permissionsService.create(createPermissionDto);
  }

  @ApiOkResponse({
    description: 'Permissions retrieved successfully.',
    type: [Permission],
  })
  @Get()
  async findAll(): Promise<ResponseDto<Permission[]>> {
    const data: Permission[] = await this.permissionsService.findAll();

    return this.responseHandler.success(
      HttpStatus.OK,
      data,
      'Permissions retrieved successfully.',
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return this.permissionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): string {
    return this.permissionsService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return this.permissionsService.remove(+id);
  }
}
