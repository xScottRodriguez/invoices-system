import { Role } from '@prisma/client';

export interface IRoleRepository {
  findAll(): Promise<Role[]>;
  findById(id: number): Promise<Role | null>;
  create(roleData: Partial<Role>): Promise<Role>;
  update(id: number, roleData: Partial<Role>): Promise<Role>;
  delete(id: number): Promise<void>;
}
