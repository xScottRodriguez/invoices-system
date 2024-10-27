import { Module } from '@nestjs/common';

import { PaginationService } from './pagination.service';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService, PaginationService],
  exports: [PrismaService, PaginationService],
})
export class PrismaModule {}
