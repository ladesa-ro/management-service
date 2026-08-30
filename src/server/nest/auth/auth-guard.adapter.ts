import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { Impl } from "@/domain/dependency-injection";
import { NEEDS_AUTH_KEY } from "./auth-decorators";
import { AuthStrategy } from "./auth-strategy.types";

@Impl()
export class AuthGuardAdapter extends AuthGuard(AuthStrategy.ACCESS_TOKEN) {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  // NOTE: `any` required by Passport AuthGuard base class signature
  handleRequest(err: Error | null, user: any, _info: unknown, context: ExecutionContext) {
    if (err) {
      throw err;
    }

    const needsAuth = this.checkIfContextNeedsAuth(context);

    if (needsAuth && !user) {
      throw new UnauthorizedException();
    }

    return user || null;
  }

  private checkIfContextNeedsAuth(context: ExecutionContext): boolean {
    // Política fail-closed: sem decorator explícito, a rota requer autenticação por padrão.
    // Rotas públicas devem ser marcadas explicitamente com @Public().
    return (
      this.reflector.getAllAndOverride<boolean>(NEEDS_AUTH_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? true
    );
  }
}
