import { Role } from '@prisma/client';
import { IPagination, ResponseDto } from 'src/common';

type FilterRole = {
  page: number;
  limit: number;
  filters?: { name: string };
  orderBy: 'asc' | 'desc';
};
export interface IRoleRepository {
  findAll(args: FilterRole): Promise<ResponseDto<Role[] | null>>;
  findById(id: number): Promise<Role | null>;
  create(roleData: Partial<Role>): Promise<Role>;
  update(id: number, roleData: Partial<Role>): Promise<Role>;
  delete(id: number): Promise<void>;
}
