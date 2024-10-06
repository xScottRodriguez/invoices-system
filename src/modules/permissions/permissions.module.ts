import { Module } from '@nestjs/common';
import { ResponseHandler } from 'src/common/response.handler';

import { PrismaModule } from '../prisma/prisma.module';
import { CaslAbilityFactory } from '../role-permissions/casl/casl-ability.factory';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { PermissionsRepository } from './repository';

@Module({
  imports: [PrismaModule],
  controllers: [PermissionsController],
  providers: [
    PermissionsService,
    PermissionsRepository,
    CaslAbilityFactory,
    ResponseHandler,
  ],
  exports: [CaslAbilityFactory],
})
export class PermissionsModule {}
