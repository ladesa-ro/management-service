import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-http-bearer";
import { IRequestActorResolver } from "@/modules/@seguranca/ator-requisicao";
import { AuthStrategy } from "../../domain";

/**
 * Estratégia de autenticação via Bearer Token.
 */
@Injectable()
export class AccessTokenStrategyAdapter extends PassportStrategy(
  Strategy,
  AuthStrategy.ACCESS_TOKEN,
) {
  constructor(
    @Inject(IRequestActorResolver)
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
