import { User } from '@prisma/client';

import { PrismaService } from '@/modules/prisma/prisma.service';

import { IUserRepository } from './user.interface';

export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  findById(_id: number): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  create(_userData: Partial<User>): Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(_id: number, _userData: Partial<User>): Promise<User> {
    throw new Error('Method not implemented.');
  }
  delete(_id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
