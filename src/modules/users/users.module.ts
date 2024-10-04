import { Module } from '@nestjs/common';
import { ResponseHandler } from 'src/common/response.handler';

import { UserEntity } from './entities/user.entity';
import { UserProvider } from './user.provider';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, ...UserProvider, ResponseHandler, UserEntity],
  exports: [...UserProvider, UsersService, UserEntity],
})
export class UsersModule {}
