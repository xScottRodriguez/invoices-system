import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { RolePermissionRepository } from './repository';
import { RolePermissionsController } from './role-permissions.controller';
import { RolePermissionsService } from './role-permissions.service';

@Module({
  imports: [PrismaModule],
  controllers: [RolePermissionsController],
  providers: [RolePermissionsService, RolePermissionRepository],
})
export class RolePermissionsModule {}
