import { Inject, Injectable } from "@nestjs/common";
import * as client from "openid-client";
import {
  IAuthOptions,
  IAuthOptions as IAuthOptionsToken,
} from "@/infrastructure.config/options/auth/auth-options.interface";

/**
 * Serviço para conexão OpenID Connect.
 */
@Injectable()
export class OpenidConnectService {
  config: client.Configuration | null = null;
  #initialized = false;

  constructor(
    @Inject(IAuthOptionsToken)
    readonly authOptions: IAuthOptions,
  ) {}

  async setup(): Promise<boolean> {
    if (!this.#initialized) {
      try {
        const config = await client.discovery(
          new URL(this.authOptions.oidcIssuer),
          this.authOptions.oidcClientId,
          this.authOptions.oidcClientSecret,
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
