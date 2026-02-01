import { Inject, Injectable } from "@nestjs/common";
import * as client from "openid-client";
import { CONFIG_PORT, type IConfigPort } from "@/modules/@shared/application/ports/out/config";

/**
 * Serviço para conexão OpenID Connect.
 */
@Injectable()
export class OpenidConnectService {
  config: client.Configuration | null = null;
  #initialized = false;

  constructor(
    @Inject(CONFIG_PORT)
    readonly appConfigService: IConfigPort,
  ) {}

  private get oidcClientCredentials() {
    return this.appConfigService.getOidcClientCredentials();
  }

  async setup(): Promise<boolean> {
    if (!this.#initialized) {
      try {
        const oidcClientCredentials = this.oidcClientCredentials;

        const config = await client.discovery(
          new URL(oidcClientCredentials.issuer),
          oidcClientCredentials.clientId,
          oidcClientCredentials.clientSecret,
        );

        this.config = config;
        this.#initialized = true;
      } catch (error) {
        console.log(error);
      }
    }

    return this.#initialized;
  }

  async getClientConfig(): Promise<client.Configuration> {
    while (!this.#initialized) {
      await this.setup();
    }

    const config = this.config;

    if (config) {
      return config;
    }

    throw new Error("[OpenidConnectService::error] config is null");
  }
}
