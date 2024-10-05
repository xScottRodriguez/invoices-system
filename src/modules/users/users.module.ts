import { Module } from '@nestjs/common';
import { ResponseHandler } from 'src/common/response.handler';

import { UserEntity } from '../auth/entity/user.entity';
import { PermissionsModule } from '../permissions/permissions.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserRepository } from './repository/user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule, PermissionsModule],
  controllers: [UsersController],
  providers: [UsersService, ResponseHandler, UserEntity, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
