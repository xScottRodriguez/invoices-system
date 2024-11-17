import { Module } from '@nestjs/common';

import { SupplierRepository } from './repository/supplier';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';

@Module({
  controllers: [SupplierController],
  providers: [SupplierService, SupplierRepository],
})
export class SupplierModule {}
