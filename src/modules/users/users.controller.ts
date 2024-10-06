import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IResponse, ResponseDto } from 'src/common';
import { ResponseHandler } from 'src/common/response.handler';
import { GetUser } from 'src/decorators';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

import { Action, Resource } from '../../enums/action.enum';
import { UserEntity } from '../auth/entity/user.entity';
import { ISignIn } from '../auth/interfaces/index';
import { CheckActionAndResource } from '../role-permissions/casl/policies.decorator';
import { PoliciesGuard } from '../role-permissions/casl/policies.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly responseHandler: ResponseHandler,
    private readonly userService: UsersService,
  ) {}

  @ApiOkResponse({
    description: 'User profile retrieved successfully.',
    type: ResponseDto<UserEntity>,
  })
  @CheckActionAndResource(Action.read, Resource.users)
  @Get('profile')
  async getProfile(@GetUser() user: UserEntity): Promise<IResponse<UserDto>> {
    const userDto = new UserDto(user);
    return this.responseHandler.success(
      HttpStatus.OK,
      userDto,
      'User profile retrieved successfully.',
    );
  }

  @ApiOkResponse({
    description: 'User profile updated successfully.',
    type: ResponseDto<ISignIn>,
  })
  @ApiBody({ type: UpdateUserDto })
  @Patch('profile')
  @CheckActionAndResource(Action.update, Resource.users)
  async updateProfile(
    @Body() user: UpdateUserDto,
  ): Promise<IResponse<unknown>> {
    await this.userService.update(user);
    return this.responseHandler.success(
      HttpStatus.OK,
      null,
      'User Profile Updated Successfully.',
    );
  }

  @Delete('profile/:id')
  @CheckActionAndResource(Action.delete, Resource.users)
  async deleteProfile(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<IResponse<unknown>> {
    await this.userService.remove(userId);
    return this.responseHandler.success(
      HttpStatus.OK,
      null,
      'User Profile Deleted Successfully.',
    );
  }
}
