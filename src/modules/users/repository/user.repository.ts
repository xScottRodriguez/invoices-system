import { PrismaService } from '@/modules/prisma/prisma.service';
import { IUserRepository } from './user.interface';
import { User } from '@prisma/client';

export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: number): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  create(userData: Partial<User>): Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(id: number, userData: Partial<User>): Promise<User> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
