import { Module } from '@nestjs/common';

import { SupplierRepository } from './repository/supplier';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';
import { ResponseHandler } from 'src/common/response.handler';

@Module({
  controllers: [SupplierController],
  providers: [SupplierService, SupplierRepository, ResponseHandler],
})
export class SupplierModule { }
