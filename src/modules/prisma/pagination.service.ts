import { Injectable } from '@nestjs/common';
import { IPagination, IPaginationOptions, IPrismaModel } from 'src/common';

interface IPaginationMeta {
  take: number;
  skip: number;
  page: number;
  totalItems: number;
}

interface IPaginationLinks {
  next: number | null;
  prev: number | null;
  totalPages: number;
}
@Injectable()
export class PaginationService {
  constructor() {}

  async paginate<Model>(
    model: IPrismaModel<Model>,
    options: IPaginationOptions,
  ): Promise<IPagination<Model>> {
    const { where = {}, limit, orderBy, page, select = {} } = options;
    const { skip, take } = this.getTakeAndSkip(page, limit);

    const [data, totalItems] = await Promise.all([
      model.findMany({ skip, take, where, select, orderBy }),
      model.count({ where }),
    ]);
    const { totalPages, next, prev } = this.getPagination({
      page,
      skip,
      take,
      totalItems,
    });

    return {
      data,
      meta: {
        currentPage: page,
        totalItems,
        totalPages,
      },
      links: {
        next,
        prev,
      },
    };
  }
  private getPagination({
    page,
    skip,
    take,
    totalItems,
  }: IPaginationMeta): IPaginationLinks {
    const totalPages = Math.ceil(totalItems / take); // Total de páginas
    const next: number | null = totalItems > take + skip ? page + 1 : null; // Página siguiente
    const prev: number | null = skip > 0 ? page - 1 : null; // Página anterior
    return { next, prev, totalPages };
  }

  private getTakeAndSkip(
    page: number,
    limit: number,
  ): { skip: number; take: number } {
    const skip = (page - 1) * limit; // Número de registros a omitir
    const take = limit; // Número de registros a obtener
    return { skip, take };
  }
}
