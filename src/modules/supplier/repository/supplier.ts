import { Logger } from '@nestjs/common';
import { Supplier } from '@prisma/client';

import { PrismaService } from '@/modules/prisma/prisma.service';

import { CreateSupplierDto } from '../dto/create-supplier.dto';
import { UpdateSupplierDto } from '../dto/update-supplier.dto';
import { ISupplierRepository } from './supplier.repository';

export class SupplierRepository implements ISupplierRepository {
  #logger = new Logger(SupplierRepository.name);
  constructor(private readonly prisma: PrismaService) {}

  create(createSupplierDto: CreateSupplierDto): Promise<Supplier[]> {
    this.#logger.debug('Creating a new supplier', {
      createSupplierDto,
    });
    return this.prisma.supplier.findMany();

    /** 
     * return this.prisma.supplier.create({
      data: {
        name: createSupplierDto.name,
        contactEmail: createSupplierDto.contactEmail,
        phone: createSupplierDto.phone,
        address: createSupplierDto.address,
      },
      
    });
      **/
  }

  findAll(): unknown[] {
    return [];
  }
  update(id: string, updateSupplierDto: UpdateSupplierDto): any {
    return this.prisma.supplier.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: updateSupplierDto.name,
        contactEmail: updateSupplierDto.contactEmail,
        phone: updateSupplierDto.phone,
        address: updateSupplierDto.address,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.supplier.delete({
      where: {
        id: parseInt(id),
      },
    });

    return;
  }

  findOne(id: number): Promise<Supplier> {
    return this.prisma.supplier.findUnique({
      where: {
        id,
      },
    });
  }
}
