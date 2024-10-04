import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
import { ResponseHandler } from 'src/common/response.handler';
import { GetUser } from 'src/decorators';
import { UserEntity } from './entities/user.entity';
import { IResponse, ResponseDto } from 'src/common';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ISignIn } from '../auth/interfaces/index';

@ApiBearerAuth()
@ApiTags('users')
@UseInterceptors(ClassSerializerInterceptor)
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
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@GetUser() user: UserEntity) {
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
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @GetUser() user: UpdateUserDto,
  ): Promise<IResponse<unknown>> {
    await this.userService.update(user);
    return this.responseHandler.success(
      HttpStatus.OK,
      null,
      'User Profile Updated Successfully.',
    );
  }

  @Delete('profile')
  @UseGuards(JwtAuthGuard)
  async deleteProfile(
    @GetUser() user: UserEntity,
  ): Promise<IResponse<unknown>> {
    await this.userService.remove(user.id);
    return this.responseHandler.success(
      HttpStatus.OK,
      null,
      'User Profile Deleted Successfully.',
    );
  }
}
