// src/user/repository/user-repository.interface.ts
import { User } from '@prisma/client';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  create(userData: Partial<User>): Promise<User>;
  update(id: number, userData: Partial<User>): Promise<User>;
  delete(id: number): Promise<void>;
}
