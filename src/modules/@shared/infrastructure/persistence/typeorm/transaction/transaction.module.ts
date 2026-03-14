import { Global, Module } from "@nestjs/common";
import { ITransaction } from "@/modules/@shared";
import { TransactionTypeOrmAdapter } from "./transaction-typeorm.adapter";

/**
 * Módulo global de transações.
 *
 * Fornece o serviço de transações para toda a aplicação,
 * permitindo que os services do core layer executem operações
 * de banco de dados dentro de transações através do port ITransaction.
 *
 * @example
 * ```typescript
 * // No service
 * constructor(
 *   @DeclareDependency(ITransaction)
 *   private readonly transactionPort: ITransaction,
 * ) {}
 *
 * async createWithRelations(dto: CreateDto) {
 *   return this.transactionPort.execute(async ({ databaseContext }) => {
 *     // Todas as operações aqui são transacionais
 *     const entity = await this.repository.save(entityData);
 *     const relation = await this.relationRepository.save(relationData);
 *     return entity;
 *   });
 * }
 * ```
 */
@Global()
@Module({
  providers: [
    {
      provide: ITransaction,
      useClass: TransactionTypeOrmAdapter,
    },
    TransactionTypeOrmAdapter,
  ],
  exports: [ITransaction, TransactionTypeOrmAdapter],
})
export class TransactionModule {}
