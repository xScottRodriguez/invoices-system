import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateUserDto } from '../auth/dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';
@Injectable()
export class UsersService {
  #logger = new Logger(UsersService.name);
  constructor(private readonly repository: UserRepository) {}

  create(user: CreateUserDto): Promise<User> {
    try {
      return this.repository.create(user);
    } catch (error) {
      this.#logger.error({
        message: error.message,
        stack: error.stack,
      });
      throw new InternalServerErrorException("Couldn't create user");
    }
  }
  findByEmail(email: string): Promise<User> {
    return this.repository.findByEmail(email);
  }

  async update(user: UpdateUserDto): Promise<void> {
    try {
      const { id: userId, ...rest } = user;
      await this.repository.update(+userId, rest);
      return;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async remove(id: number): Promise<void> {
    try {
      const userExists = await this.repository.findById(id);
      if (!userExists)
        throw new UnprocessableEntityException("User doesn't exist");

      await this.repository.delete(id);
      return;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
