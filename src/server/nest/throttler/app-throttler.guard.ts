import { type ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { ThrottlerGuard } from "@nestjs/throttler";

/**
 * Guard global de Throttling adaptado para suportar contextos HTTP (REST)
 * e GraphQL simultaneamente sem falhar quando switchToHttp() não estiver disponível.
 */
@Injectable()
export class AppThrottlerGuard extends ThrottlerGuard {
  protected override getRequestResponse(context: ExecutionContext): {
    req: Record<string, any>;
    res: Record<string, any>;
  } {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();

    if (ctx && ctx.req) {
      return { req: ctx.req, res: ctx.res ?? ctx.req.res ?? {} };
    }

    const http = context.switchToHttp();
    return { req: http.getRequest() ?? {}, res: http.getResponse() ?? {} };
  }
}
