import * as client from "openid-client";
import type { IIdpTokenService, ITokenSet } from "@/domain/abstractions/identity-provider";
import { Impl } from "@/domain/dependency-injection";
import { getNowTime } from "@/utils/date";
import { OpenidConnectService } from "./openid-connect.service";

@Impl()
export class OpenidConnectTokenService implements IIdpTokenService {
  constructor(private readonly openidConnectService: OpenidConnectService) {}

  async passwordGrant(username: string, password: string): Promise<ITokenSet> {
    const config = await this.openidConnectService.getClientConfig();

    const tokenset = await client.genericGrantRequest(config, "password", {
      username,
      password,
      scope: "openid profile",
    });

    return this.formatTokenSet(tokenset);
  }

  async refreshGrant(refreshToken: string): Promise<ITokenSet> {
    const config = await this.openidConnectService.getClientConfig();
    const tokenset = await client.refreshTokenGrant(config, refreshToken);
    return this.formatTokenSet(tokenset);
  }

  private formatTokenSet(
    tokenset: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers,
  ): ITokenSet {
    return {
      access_token: tokenset.access_token ?? null,
      token_type: tokenset.token_type ?? null,
      id_token: tokenset.id_token ?? null,
      refresh_token: tokenset.refresh_token ?? null,
      expires_in: tokenset.expires_in ?? null,
      expires_at: tokenset.expires_in
        ? new Date(getNowTime() + tokenset.expires_in).getTime()
        : null,
      session_state: (tokenset.session_state as string) ?? null,
      scope: tokenset.scope ?? null,
    };
  }
}
