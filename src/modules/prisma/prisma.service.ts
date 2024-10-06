import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  #logger = new Logger(PrismaService.name);
  async onModuleInit(): Promise<void> {
    this.#logger.log('Connecting to the database');
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    this.#logger.log('Disconnecting from the database');
    await this.$disconnect();
  }
}
