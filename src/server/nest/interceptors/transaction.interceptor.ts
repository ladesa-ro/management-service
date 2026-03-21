import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
} from "@nestjs/common";
import { from, type Observable } from "rxjs";
import { DeclareDependency } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { transactionStorage } from "@/infrastructure.database/typeorm/connection/transaction-storage";

/**
 * Interceptor global que envolve cada request em uma transação.
 *
 * - Se o handler retornar com sucesso, a transação é commitada
 * - Se o handler lançar exceção, a transação é automaticamente revertida
 * - Repositórios injetados participam automaticamente via AsyncLocalStorage
 */
@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return from(
      this.appTypeormConnection.transaction((entityManager) => {
        return transactionStorage.run(entityManager, () => {
          return new Promise<unknown>((resolve, reject) => {
            next.handle().subscribe({
              next: resolve,
              error: reject,
            });
          });
        });
      }),
    );
  }
}
