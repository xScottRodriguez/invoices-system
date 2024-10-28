import { forwardRef, Module } from '@nestjs/common';
import { ResponseHandler } from 'src/common/response.handler';

import { PrismaModule } from '@/modules/prisma/prisma.module';

import { PermissionsModule } from '../permissions/permissions.module';
import { RoleRepository } from './repository/role.repository';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [PrismaModule, forwardRef(() => PermissionsModule)],
  controllers: [RolesController],
  providers: [RolesService, RoleRepository, ResponseHandler],
})
export class RolesModule {}
