import { Injectable } from '@nestjs/common';
import { Supplier } from '@prisma/client';

import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierRepository } from './repository/supplier';

@Injectable()
export class SupplierService {
  constructor(private repository: SupplierRepository) {}
  create(createSupplierDto: CreateSupplierDto): Promise<Supplier[]> {
    return this.repository.create(createSupplierDto);
  }

  findAll(): string {
    return `This action returns all supplier`;
  }

  findOne(id: number): string {
    return `This action returns a #${id} supplier`;
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto): string {
    return `This action updates a #${id} supplier ${JSON.stringify(updateSupplierDto)}`;
  }

  remove(id: number): string {
    return `This action removes a #${id} supplier`;
  }
}
