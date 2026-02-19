import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import type { ITransactionContext, ITransactionPort, TransactionCallback } from "@/modules/@shared";
import { APP_DATA_SOURCE_TOKEN } from "../providers/app-data-source.provider";

/**
 * Adapter TypeORM que implementa o port de transações.
 *
 * Utiliza o DataSource diretamente para gerenciar transações.
 */
@Injectable()
export class TransactionTypeOrmAdapter implements ITransactionPort {
  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN)
    private readonly dataSource: DataSource,
  ) {}

  async execute<T>(callback: TransactionCallback<T>): Promise<T> {
    return this.dataSource.transaction(async (entityManager) => {
      const context: ITransactionContext = {
        databaseContext: entityManager,
      };

      return callback(context);
    });
  }
}
