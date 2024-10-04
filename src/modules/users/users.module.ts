import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserProvider } from './user.provider';
import { ResponseHandler } from 'src/common/response.handler';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, ...UserProvider, ResponseHandler, UserEntity],
  exports: [...UserProvider, UsersService, UserEntity],
})
export class UsersModule {}
