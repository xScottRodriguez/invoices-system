import {
  Injectable,
  InternalServerErrorException,
  Logger,
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
    return this.repository.create(user);
  }
  findByEmail(email: string): Promise<User> {
    return this.repository.findByEmail(email);
  }

  async update(user: UpdateUserDto): Promise<void> {
    try {
      const { id, ...rest } = user;
      await this.repository.update(id, rest);
      return;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async remove(id: number): Promise<void> {
    try {
      await this.repository.delete(id);
      return;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
