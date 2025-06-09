import { Injectable } from "@nestjs/common";
import { JwksClient, SigningKey } from "jwks-rsa";
import { OpenidConnectService } from "../openid-connect";

@Injectable()
export class JwksRsaClientService {
  #jwksClient: JwksClient | null = null;

  constructor(private openidConnectService: OpenidConnectService) {}

  async getJwksClient() {
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

  private async createJwksClient() {
    try {
      const config = await this.openidConnectService.getClientConfig();

      const jwksUri = config.serverMetadata().jwks_uri;

      if (jwksUri) {
        return new JwksClient({
          timeout: 30000, // Defaults to 30s

          cache: true, // Default Value
          cacheMaxEntries: 5, // Default value
          cacheMaxAge: 600000, // Defaults to 10m

          rateLimit: true,
          jwksRequestsPerMinute: 10, // Default value

          jwksUri: jwksUri,
        });
      }
    } catch (_e) {}

    return null;
  }

  private async setup() {
    if (!this.#jwksClient) {
      this.#jwksClient = await this.createJwksClient();
    }
  }
}
