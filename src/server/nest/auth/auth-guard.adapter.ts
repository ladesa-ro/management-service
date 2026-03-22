import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { DeclareImplementation } from "@/domain/dependency-injection";
import { NEEDS_AUTH_KEY } from "./auth-decorators";
import { AuthStrategy } from "./auth-strategy.types";

@DeclareImplementation()
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
    return (
      this.reflector.getAllAndOverride<boolean>(NEEDS_AUTH_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? false
    );
  }
}
