import { HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

interface IResponse<T> {
  statusCode: HttpStatus;
  data: T;
  message: string;
}

interface IMeta {
  currentPage: number;
  totalItems: number;
  totalPages: number;
}
interface ILinks {
  next: number | null;
  prev: number | null;
}
interface IPagination<T> {
  data: T[];
  meta: IMeta;
  links: ILinks;
}

interface IPaginationOptions {
  limit?: number;
  page?: number;
  where: unknown;
  select?: unknown;
  orderBy?: unknown;
}

interface IPrismaModel<T> {
  findMany: (args?: object) => Prisma.PrismaPromise<T[]>;
  count: (args?: object) => Prisma.PrismaPromise<number>;
}

export { IPagination, IPrismaModel, IResponse, IPaginationOptions };
