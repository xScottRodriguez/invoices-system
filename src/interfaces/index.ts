import { Prisma, Resource } from '@prisma/client';
import { Sql } from '@prisma/client/runtime/library';

export interface IPaginationOptions<T = unknown, U = unknown> {
  limit?: number;
  page?: number;
  where: T;
  select?: U;
  orderBy?: Prisma.SortOrder;
}

export interface IPaginationOptionsRaw {
  query: Sql;
  limit?: number;
  page?: number;
}
export interface IPageResponse {
  prev: number | null;
  next: number | null;
  count: number;
}

export interface IPagination<T> {
  data: T[];
  total: number;
  page: IPageResponse;
}

export interface IPrismaModel<T> {
  findMany: (args?: object) => Prisma.PrismaPromise<T[]>;
  count: (args?: object) => Prisma.PrismaPromise<number>;
}
export interface IRepositoriesPaginations<T> {
  filters: T;
  limit: number;
  page: number;
}

interface IPermission {
  id: number;
  action: string;
  resourceId: number;
  description: string | null;
  resource: Resource;
}

export { IPermission };
