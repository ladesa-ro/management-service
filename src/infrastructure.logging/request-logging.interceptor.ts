import {
  type CallHandler,
  type ExecutionContext,
  Inject,
  Injectable,
  type NestInterceptor,
} from "@nestjs/common";
import type { GqlContextType } from "@nestjs/graphql";
import { GqlExecutionContext } from "@nestjs/graphql";
import type { Request } from "express";
import type { Observable } from "rxjs";
import { tap } from "rxjs";
import type { ILoggerPort, IPerformanceHooks } from "@/domain/abstractions/logging";
import {
  ILoggerPort as ILoggerPortToken,
  IPerformanceHooks as IPerformanceHooksToken,
} from "@/domain/abstractions/logging";

/**
 * Interceptor que loga requests HTTP e mede tempo de execução
 * via performance hooks.
 */
@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(ILoggerPortToken)
    private readonly logger: ILoggerPort,
    @Inject(IPerformanceHooksToken)
    private readonly perfHooks: IPerformanceHooks,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const isGraphql = context.getType<GqlContextType>() === "graphql";

    const req: Request | undefined = isGraphql
      ? GqlExecutionContext.create(context).getContext().req
      : context.switchToHttp().getRequest<Request>();

    const method = req?.method ?? "GRAPHQL";
    const url = req?.url ?? "graphql";
    const correlationId = req?.correlationId;

    const checkpoint = this.perfHooks.startCheckpoint("http.request", {
      method,
      url,
      correlationId,
    });

    this.logger.log(`→ ${method} ${url}`, "HTTP", { correlationId });

    return next.handle().pipe(
      tap({
        next: () => {
          checkpoint.end();
          this.logger.log(`← ${method} ${url}`, "HTTP", { correlationId });
        },
        error: (err) => {
          checkpoint.end();
          this.logger.error(`✗ ${method} ${url}`, err?.stack, "HTTP", { correlationId });
        },
      }),
    );
  }
}
