import { ForbiddenException, Injectable, ServiceUnavailableException } from "@nestjs/common";
import * as client from "openid-client";
import { OpenidConnectService } from "@/modules/@seguranca/provedor-identidade";
import {
  type IAutenticacaoRefreshCommand,
  IAutenticacaoRefreshCommandHandler,
} from "@/modules/acesso/autenticacao/domain/commands/autenticacao-refresh.command.handler.interface";
import type { AuthSessionCredentialsDto } from "../dtos";

@Injectable()
export class AutenticacaoRefreshCommandHandlerImpl implements IAutenticacaoRefreshCommandHandler {
  constructor(private readonly openidConnectService: OpenidConnectService) {}

  async execute({ dto }: IAutenticacaoRefreshCommand): Promise<AuthSessionCredentialsDto> {
    let config: client.Configuration;

    try {
      config = await this.openidConnectService.getClientConfig();
    } catch (_error) {
      throw new ServiceUnavailableException();
    }

    try {
      const refreshToken = dto.refreshToken;

      if (refreshToken) {
        const tokenset = await client.refreshTokenGrant(config, refreshToken);
        const formattedTokenSet = this.formatTokenSet(tokenset);
        return formattedTokenSet;
      }
    } catch (_error) {}

    throw new ForbiddenException("Credenciais inválidas ou expiradas.");
  }

  private formatTokenSet(
    tokenset: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers,
  ) {
    return <AuthSessionCredentialsDto>{
      access_token: tokenset.access_token ?? null,
      token_type: tokenset.token_type ?? null,
      id_token: tokenset.id_token ?? null,
      refresh_token: tokenset.refresh_token ?? null,
      expires_in: tokenset.expires_in ?? null,
      expires_at: tokenset.expires_in ? new Date(Date.now() + tokenset.expires_in).getTime() : null,
      session_state: tokenset.session_state ?? null,
      scope: tokenset.scope ?? null,
    };
  }
}
