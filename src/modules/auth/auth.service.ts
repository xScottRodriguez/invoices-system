import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { plainToClass } from 'class-transformer';

import { UsersService } from '../users/users.service';
import { LoginDto } from './dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { EncoderService } from './encoder.service';
import { UserEntity } from './entity/user.entity';
import { ISignIn } from './interfaces';

@Injectable()
export class AuthService {
  #logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UsersService,
    private readonly repository: UsersService,
    private readonly encoderService: EncoderService,
    private readonly jwt: JwtService,
  ) {}

  async signIn(user: LoginDto): Promise<ISignIn> {
    try {
      const userFound: User = await this.userService.findByEmail(user.email);
      if (!userFound) throw new UnprocessableEntityException('User not found');

      const isPasswordValid: boolean = await this.encoderService.checkPassword(
        user.password,
        userFound.password,
      );

      if (!isPasswordValid)
        throw new UnprocessableEntityException('Invalid Credentials');

      const accessToken = await this.jwt.signAsync({
        id: userFound.id,
        email: userFound.email,
      });
      return {
        user: plainToClass(UserEntity, new UserEntity(userFound)),
        accessToken,
      };
    } catch (error) {
      this.#logger.error(error.message);
      if (error instanceof UnprocessableEntityException) throw error;

      throw new InternalServerErrorException(error.message);
    }
  }

  async signUp(user: CreateUserDto): Promise<ISignIn> {
    try {
      const { password: pass, ...rest } = user;
      const password = await this.encoderService.encodePassword(pass);
      const userCreated = await this.repository.create({
        ...rest,
        password,
      });
      const payload: string = await this.jwt.signAsync({
        id: userCreated.id,
        email: userCreated.email,
      });
      const userEntity = plainToClass(UserEntity, new UserEntity(userCreated));
      return {
        user: new UserResponseDto(userEntity),
        accessToken: payload,
      };
    } catch (error) {
      this.#logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
}
