import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-http-bearer";
import { IRequestActorResolver } from "@/domain/abstractions/request-actor";
import { Dep, Impl } from "@/domain/dependency-injection";
import { AuthStrategy } from "./auth-strategy.types";

@Impl()
export class AccessTokenStrategyAdapter extends PassportStrategy(
  Strategy,
  AuthStrategy.ACCESS_TOKEN,
) {
  constructor(
    @Dep(IRequestActorResolver)
    private readonly requestActorResolver: IRequestActorResolver,
  ) {
    super();
  }

  async validate(accessToken?: string) {
    const currentUsuario = await this.requestActorResolver.resolveFromAccessToken(accessToken);

    if (!currentUsuario) {
      throw new UnauthorizedException("Not authenticated.");
    }

    return currentUsuario;
  }
}
