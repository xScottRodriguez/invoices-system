import { InternalServerErrorException } from '@nestjs/common';
import {
  IPagination,
  IPaginationOptions,
  ISequelizeModel,
} from 'src/interfaces';
import { getTakeAndSkip } from './get-take-skip';

/**
 * servicio de paginacion generica
 * @param {T} -> es el tipo generico a retornar
 */
const pageBuilder = async <T>(
  model: ISequelizeModel<T>,
  options: IPaginationOptions<T>,
): Promise<IPagination<T>> => {
  try {
    const { limit = 10, page = 1, where = {} } = options;
    const { skip: offset, take } = getTakeAndSkip(limit, page);

    const [data, total] = await Promise.all([
      model.findMany({
        where,
        limit: take,
        offset,
      }),
      model.count({ where }),
    ]);

    const next: number | null = total > take + offset ? page + 1 : null;
    const prev: number | null = offset > 0 ? page - 1 : null;
    const count: number = Math.ceil(total / take);

    return {
      data,
      total,
      page: {
        next,
        prev,
        count,
      },
    };
  } catch (error) {
    throw new InternalServerErrorException(
      'Error al intentar realizar la busqueda',
    );
  }
};
export default pageBuilder;
