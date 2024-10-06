import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

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

  executeTransaction<T>(
    tx: Prisma.TransactionClient | undefined = undefined,
    callback: (tx: Prisma.TransactionClient) => Promise<T>,
  ): Promise<T> {
    if (!callback) throw new Error('You must provide a callback function');
    if (tx) return callback(tx);
    return this.$transaction((tx: Prisma.TransactionClient) => callback(tx));
  }
}
