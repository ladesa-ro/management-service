import { Global, Module } from "@nestjs/common";
import { TRANSACTION_PORT } from "@/modules/@shared";
import { TransactionTypeOrmAdapter } from "./transaction-typeorm.adapter";

/**
 * Módulo global de transações.
 *
 * Fornece o serviço de transações para toda a aplicação,
 * permitindo que os services do core layer executem operações
 * de banco de dados dentro de transações através do port ITransactionPort.
 *
 * @example
 * ```typescript
 * // No service
 * constructor(
 *   @Inject(TRANSACTION_PORT)
 *   private readonly transactionPort: ITransactionPort,
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
      provide: TRANSACTION_PORT,
      useClass: TransactionTypeOrmAdapter,
    },
    TransactionTypeOrmAdapter,
  ],
  exports: [TRANSACTION_PORT, TransactionTypeOrmAdapter],
})
export class TransactionModule {}
