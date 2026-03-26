import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
} from "@nestjs/common";
import { type GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { from, type Observable } from "rxjs";
import { DeclareDependency } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { transactionStorage } from "@/infrastructure.database/typeorm/connection/transaction-storage";

/**
 * Interceptor global que envolve operações de escrita em uma transação.
 *
 * - Operações de leitura (GET/HEAD em REST, query em GraphQL) NÃO abrem transação
 * - Operações de escrita (POST/PUT/PATCH/DELETE em REST, mutation em GraphQL) abrem transação
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

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (this.isReadOperation(context)) {
      return next.handle();
    }

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

  private isReadOperation(context: ExecutionContext): boolean {
    try {
      const contextType = context.getType<GqlContextType>();

      if (contextType === "graphql") {
        const gqlContext = GqlExecutionContext.create(context);
        const info = gqlContext.getInfo();
        return info.operation.operation === "query";
      }

      const request = context.switchToHttp().getRequest();
      return request.method === "GET" || request.method === "HEAD";
    } catch {
      return false;
    }
  }
}
