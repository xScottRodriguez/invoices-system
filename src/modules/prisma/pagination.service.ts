import { Injectable, HttpStatus } from '@nestjs/common';
import { IPagination, IPaginationOptions, IPrismaModel, ResponseDto } from 'src/common';

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
  constructor() { }

  async paginate<Model>(
    model: IPrismaModel<Model>,
    options: IPaginationOptions,
  ): Promise<ResponseDto<Model[]>> {
    const { where = {}, limit, orderBy, page, select } = options;
    const { skip, take } = this.getTakeAndSkip(page, limit);

    const args = {
      skip,
      take,
      where,
      orderBy,
    };

    if (
      typeof select === 'object' &&
      select !== null &&
      Object.entries(select).length
    ) {
      args['select'] = select;
    }

    const [data, totalItems]: [Model[], number] = await Promise.all([
      model.findMany(args),
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
      statusCode: HttpStatus.OK,
      messages: ['Data retrieved successfully']
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
