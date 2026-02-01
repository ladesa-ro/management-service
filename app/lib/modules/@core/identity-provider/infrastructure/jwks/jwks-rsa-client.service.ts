import { Injectable } from "@nestjs/common";
import { JwksClient, SigningKey } from "jwks-rsa";
import { OpenidConnectService } from "../openid-connect";

/**
 * Serviço para obter chaves públicas via JWKS.
 */
@Injectable()
export class JwksRsaClientService {
  #jwksClient: JwksClient | null = null;

  constructor(private openidConnectService: OpenidConnectService) {}

  async getJwksClient(): Promise<JwksClient> {
    await this.setup();

    if (!this.#jwksClient) {
      throw new Error("[JwksRsaClientService::error] can not create JwksClient.");
    }

    return this.#jwksClient;
  }

  async getSigninKeyByKid(kid: string | null): Promise<SigningKey | null> {
    try {
      if (kid) {
        const jwksClient = await this.getJwksClient();
        const signingKey = await jwksClient.getSigningKey(kid);
        return signingKey;
      }
    } catch (_) {
      console.debug(_);
    }

    return null;
  }

  async getSigninKeyPublicKeyByKid(kid: string | null): Promise<string | null> {
    const signingKey = await this.getSigninKeyByKid(kid);

    if (signingKey) {
      return signingKey.getPublicKey();
    }

    return null;
  }

  private async createJwksClient(): Promise<JwksClient | null> {
    try {
      const config = await this.openidConnectService.getClientConfig();
      const jwksUri = config.serverMetadata().jwks_uri;

      if (jwksUri) {
        return new JwksClient({
          timeout: 30000,
          cache: true,
          cacheMaxEntries: 5,
          cacheMaxAge: 600000,
          rateLimit: true,
          jwksRequestsPerMinute: 10,
          jwksUri: jwksUri,
        });
      }
    } catch (_e) {}

    return null;
  }

  private async setup(): Promise<void> {
    if (!this.#jwksClient) {
      this.#jwksClient = await this.createJwksClient();
    }
  }
}
