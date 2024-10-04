import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IResponse, ResponseDto } from 'src/common';
import { ResponseHandler } from 'src/common/response.handler';
import { LoginDto, CreateUserDto, UserResponseDto } from './dto';
import { ISignIn } from './interfaces';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseHandler: ResponseHandler,
  ) {}

  @ApiOkResponse({ type: ResponseDto<UserResponseDto> })
  @ApiBody({ type: CreateUserDto })
  @Post('sign-up')
  async register(@Body() user: CreateUserDto): Promise<IResponse<ISignIn>> {
    const data: ISignIn = await this.authService.signUp(user);
    return this.responseHandler.success<ISignIn>(
      HttpStatus.CREATED,
      data,
      'User created successfully',
    );
  }

  @ApiOkResponse({ type: ResponseDto<UserResponseDto> })
  @ApiBody({ type: LoginDto })
  @Post('sign-in')
  async signIn(@Body() user: LoginDto): Promise<IResponse<ISignIn>> {
    const data: ISignIn = await this.authService.signIn(user);
    return this.responseHandler.success<{
      user: UserResponseDto;
      accessToken: string;
    }>(HttpStatus.OK, data, 'User signed in successfully');
  }
}
