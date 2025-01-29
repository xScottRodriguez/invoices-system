import { Supplier } from '@prisma/client';

import { CreateSupplierDto } from '../dto/create-supplier.dto';

export interface ISupplierRepository {
  create(createSupplierDto: CreateSupplierDto): Promise<Supplier>;
  findAll(): unknown[];
  findOne(id: number): Promise<Supplier>;
  update(id: string, updateSupplierDto: Partial<Supplier>): any;
  remove(id: string): any;
}
