import { AppConfigService } from "@/infrastructure/config";
import { Inject, Injectable } from "@nestjs/common";
import * as client from "openid-client";

@Injectable()
export class OpenidConnectService {
  config: client.Configuration | null = null;

  #initialized = false;

  constructor(
    //
    @Inject(AppConfigService)
    readonly appConfigService: AppConfigService,
  ) {}

  private get oidcClientCredentials() {
    return this.appConfigService.getOidcClientCredentials();
  }

  async setup() {
    if (!this.#initialized) {
      try {
        const oidcClientCredentials = this.oidcClientCredentials;

        const config = await client.discovery(new URL(oidcClientCredentials.issuer), oidcClientCredentials.clientId, oidcClientCredentials.clientSecret);

        this.config = config;

        this.#initialized = true;
      } catch (error) {
        console.log(error);
      }
    }

    return this.#initialized;
  }

  async getClientConfig() {
    while (!this.#initialized) {
      await this.setup();
    }

    const config = this.config;

    if (config) {
      return config;
    }

    throw new Error("[OpenidConnectService::error] trustIssuerClient is null");
  }
}
