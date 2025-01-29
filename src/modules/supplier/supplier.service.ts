import { HttpStatus, Injectable } from '@nestjs/common';
import { Supplier } from '@prisma/client';

import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierRepository } from './repository/supplier';
import { ResponseHandler } from 'src/common/response.handler';
import { ResponseDto } from 'src/common';

@Injectable()
export class SupplierService {
  constructor(private repository: SupplierRepository, private readonly responseHandler: ResponseHandler) { }
  async create(createSupplierDto: CreateSupplierDto): Promise<ResponseDto<Supplier>> {

    const supplierCreaed: Supplier = await this.repository.create(createSupplierDto)

    return this.responseHandler.send<Supplier>(HttpStatus.CREATED, supplierCreaed, ['Supplier created successfully']);
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
