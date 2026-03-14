import { DataSource } from "typeorm";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { ITransaction, ITransactionContext, TransactionCallback } from "@/modules/@shared";
import { APP_DATA_SOURCE_TOKEN } from "../providers/app-data-source.provider";

/**
 * Adapter TypeORM que implementa o port de transações.
 *
 * Utiliza o DataSource diretamente para gerenciar transações.
 */

@DeclareImplementation()
export class TransactionTypeOrmAdapter implements ITransaction {
  constructor(
    @DeclareDependency(APP_DATA_SOURCE_TOKEN)
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
