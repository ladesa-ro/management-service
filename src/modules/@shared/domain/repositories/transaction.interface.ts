/**
 * Token de injeção para o serviço de transações
 */
export const TRANSACTION_PORT = Symbol("ITransactionPort");

/**
 * Contexto disponível durante uma transação.
 * Fornece acesso ao DatabaseContext com repositórios vinculados à transação.
 */
export interface ITransactionContext {
  /**
   * O contexto de banco de dados com todos os repositórios
   * vinculados ao EntityManager da transação.
   *
   * @deprecated Acesse repositórios diretamente do contexto.
   * Este campo será removido em versões futuras.
   */
  databaseContext: unknown;
}

/**
 * Callback executado dentro de uma transação
 */
export type TransactionCallback<T> = (context: ITransactionContext) => Promise<T>;

/**
 * Port de saída para gerenciamento de transações.
 *
 * Define o contrato para executar operações de banco de dados
 * dentro de uma transação com commit/rollback automático.
 *
 * @example
 * ```typescript
 * // No service
 * async createWithRelations(dto: CreateDto) {
 *   return this.transactionPort.execute(async ({ databaseContext }) => {
 *     const entity = await this.repository.save(entityData);
 *     const relation = await this.relationRepository.save(relationData);
 *     return entity;
 *   });
 * }
 * ```
 */
export interface ITransactionPort {
  /**
   * Executa um callback dentro de uma transação.
   *
   * - Se o callback retornar com sucesso, a transação é commitada
   * - Se o callback lançar exceção, a transação é automaticamente revertida
   * - Todos os repositórios acessados via context estão vinculados à transação
   *
   * @param callback - Função a ser executada dentro da transação
   * @returns O valor retornado pelo callback
   * @throws Re-lança qualquer exceção do callback após rollback
   */
  execute<T>(callback: TransactionCallback<T>): Promise<T>;
}
