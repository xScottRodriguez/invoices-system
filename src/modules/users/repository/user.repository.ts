import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '@/modules/prisma/prisma.service';

import { IUserRepository } from './user.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  #logger = new Logger(UserRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  findById(_id: number): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  create(userData: Partial<User>): Promise<User> {
    const { email, password, name, roleId } = userData;
    return this.prisma.user.create({
      data: {
        email,
        password,
        name,
        roleId: roleId ?? 1,
      },
    });
  }
  update(_id: number, _userData: Partial<User>): Promise<User> {
    throw new Error('Method not implemented.');
  }
  delete(_id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
