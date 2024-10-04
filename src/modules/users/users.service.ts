import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Repositories } from '../../config';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  #logger = new Logger(UsersService.name);
  constructor(
    @Inject(Repositories.User) private readonly repository: typeof UserEntity,
  ) {}

  findByEmail(email: string): Promise<UserEntity> {
    return this.repository.findOne({ where: { email } });
  }

  async update(user: UpdateUserDto): Promise<void> {
    try {
      const { id, ...rest } = user;
      await this.repository.update(rest, { where: { id } });
      return;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async remove(id: number): Promise<void> {
    try {
      await this.repository.destroy({ where: { id } });
      return;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
