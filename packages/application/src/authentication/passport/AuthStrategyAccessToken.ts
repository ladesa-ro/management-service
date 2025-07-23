import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-http-bearer";
import { RequestActorService } from "../request-actor";
import { AuthStrategy } from "./AuthStrategy";

@Injectable()
export class AuthStrategyAccessToken extends PassportStrategy(Strategy, AuthStrategy.ACCESS_TOKEN) {
  constructor(private requestActorService: RequestActorService) {
    super();
  }

  async validate(accessToken?: string) {
    const currentUsuario = await this.requestActorService.getCurrentFuncionarioByAccessToken(accessToken);

    if (!currentUsuario) {
      throw new UnauthorizedException("Not authenticated.");
    }

    return currentUsuario;
  }
}
