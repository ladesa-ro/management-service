import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { NEEDS_AUTH_KEY } from "./AuthResourceProtectionLevel";
import { AuthStrategy } from "./AuthStrategy";

@Injectable()
export class AuthGuardJwt extends AuthGuard(AuthStrategy.ACCESS_TOKEN) {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    // const ctx = GqlExecutionContext.create(context);
    // const req = ctx.getContext().req;
    return context.switchToHttp().getRequest();
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

  private checkIfContextNeedsAuth(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<boolean>(NEEDS_AUTH_KEY, [context.getHandler(), context.getClass()]) ?? false;
  }
}
