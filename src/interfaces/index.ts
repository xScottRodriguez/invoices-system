import { FindOptions, CountOptions } from 'sequelize';
import { OrderType } from 'src/enums';

// Opciones de paginación
export interface IPaginationOptions<T> {
  limit?: number;
  page?: number;
  where?: FindOptions<T>['where'];
  select?: Array<keyof T>;
  orderBy?: OrderType;
}

// Opciones para ejecutar consultas sin procesar
export interface IPaginationOptionsRaw {
  query: string;
  limit?: number;
  page?: number;
}

// Respuesta de paginación
export interface IPageResponse {
  prev: number | null;
  next: number | null;
  count: number;
}

// Interfaz para la respuesta de paginación
export interface IPagination<T> {
  data: T[];
  total: number;
  page: IPageResponse;
}

// Modelo para operaciones con Sequelize
export interface ISequelizeModel<T> {
  findMany: (options?: FindOptions<T>) => Promise<T[]>; // Método para encontrar múltiples registros
  count: (options?: CountOptions<T>) => Promise<number>; // Método para contar registros
}

// Interfaz para los filtros de paginación
export interface IRepositoriesPaginations<T> {
  filters: T;
  limit: number;
  page: number;
}
