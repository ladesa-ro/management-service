import { Injectable } from "@nestjs/common";
import { DatabaseContextService } from "@/database-context";
import type { ITransactionContext, ITransactionPort, TransactionCallback } from "@/modules/@shared";

/**
 * Adapter TypeORM que implementa o port de transações.
 *
 * Este adapter faz a ponte entre o core layer (que depende do port)
 * e a infraestrutura de persistência (TypeORM).
 *
 * Utiliza o DatabaseContextService para gerenciar transações,
 * garantindo que todos os repositórios acessados durante a
 * transação estejam vinculados ao mesmo EntityManager.
 */
@Injectable()
export class TransactionTypeOrmAdapter implements ITransactionPort {
  constructor(private readonly databaseContextService: DatabaseContextService) {}

  /**
   * Executa um callback dentro de uma transação TypeORM.
   *
   * - Cria uma nova transação usando o DataSource
   * - Fornece um DatabaseContext com repositórios vinculados ao EntityManager da transação
   * - Commit automático se o callback retornar com sucesso
   * - Rollback automático se o callback lançar exceção
   *
   * @param callback - Função a ser executada dentro da transação
   * @returns O valor retornado pelo callback
   * @throws Re-lança qualquer exceção do callback após rollback
   */
  async execute<T>(callback: TransactionCallback<T>): Promise<T> {
    return this.databaseContextService.transaction(async ({ databaseContext }) => {
      const context: ITransactionContext = {
        databaseContext,
      };

      return callback(context);
    });
  }
}
