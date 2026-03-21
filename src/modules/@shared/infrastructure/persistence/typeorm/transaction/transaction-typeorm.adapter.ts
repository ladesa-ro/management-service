import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/conn.interface";
import type { ITransaction, ITransactionContext, TransactionCallback } from "@/modules/@shared";

/**
 * Adapter TypeORM que implementa o port de transações.
 *
 * Utiliza o DataSource diretamente para gerenciar transações.
 */

@DeclareImplementation()
export class TransactionTypeOrmAdapter implements ITransaction {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async execute<T>(callback: TransactionCallback<T>): Promise<T> {
    return this.appTypeormConnection.transaction(async (entityManager) => {
      const context: ITransactionContext = {
        databaseContext: entityManager,
      };

      return callback(context);
    });
  }
}
