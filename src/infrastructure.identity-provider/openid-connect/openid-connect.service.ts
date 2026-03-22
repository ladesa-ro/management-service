import * as client from "openid-client";
import { ILoggerPort, ILoggerPort as ILoggerPortToken } from "@/domain/abstractions/logging";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { IAuthOptions } from "../options/auth-options.interface";
import { IAuthOptions as IAuthOptionsToken } from "../options/auth-options.interface";

@DeclareImplementation()
export class OpenidConnectService {
  config: client.Configuration | null = null;
  #initialized = false;

  constructor(
    @DeclareDependency(IAuthOptionsToken)
    readonly authOptions: IAuthOptions,
    @DeclareDependency(ILoggerPortToken)
    private readonly logger: ILoggerPort,
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
        this.logger.error(
          String(error),
          error instanceof Error ? error.stack : undefined,
          "OpenidConnect",
        );
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
