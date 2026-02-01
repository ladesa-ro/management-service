import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { AuthStrategy } from "../../domain";
import { NEEDS_AUTH_KEY } from "../decorators";

/**
 * Guard de autenticação que verifica se o usuário está autenticado.
 * Suporta tanto HTTP quanto GraphQL.
 */
@Injectable()
export class AuthGuardAdapter extends AuthGuard(AuthStrategy.ACCESS_TOKEN) {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  handleRequest(err: any, user: any, _info: any, context: ExecutionContext) {
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
    return (
      this.reflector.getAllAndOverride<boolean>(NEEDS_AUTH_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? false
    );
  }
}
