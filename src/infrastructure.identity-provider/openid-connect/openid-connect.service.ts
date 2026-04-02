import { type OnModuleInit } from "@nestjs/common";
import * as client from "openid-client";
import { ServiceUnavailableError } from "@/application/errors";
import { ILoggerPort, ILoggerPort as ILoggerPortToken } from "@/domain/abstractions/logging";
import { DeclareImplementation, Dep } from "@/domain/dependency-injection";
import { IConnectionHealthRegistry } from "@/shared/resilience/connection-health-registry.interface";
import { retryWithBackoff } from "@/shared/resilience/retry-with-backoff";
import type { IAuthOptions } from "../options/auth-options.interface";
import { IAuthOptions as IAuthOptionsToken } from "../options/auth-options.interface";

const DEPENDENCY_NAME = "identity-provider";

@DeclareImplementation()
export class OpenidConnectService implements OnModuleInit {
  #config: client.Configuration | null = null;
  #initialized = false;

  constructor(
    @Dep(IAuthOptionsToken)
    readonly authOptions: IAuthOptions | null,
    @Dep(ILoggerPortToken)
    private readonly logger: ILoggerPort,
    @Dep(IConnectionHealthRegistry)
    private readonly healthRegistry: IConnectionHealthRegistry,
  ) {}

  onModuleInit(): void {
    this.healthRegistry.register(DEPENDENCY_NAME);

    if (!this.authOptions) {
      this.healthRegistry.markUnavailable(DEPENDENCY_NAME, "Identity provider not configured");
      return;
    }

    this.#startConnectionLoop(this.authOptions);
  }

  async getClientConfig(): Promise<client.Configuration> {
    if (this.#initialized && this.#config) {
      return this.#config;
    }

    throw new ServiceUnavailableError(undefined, DEPENDENCY_NAME);
  }

  #startConnectionLoop(authOptions: IAuthOptions): void {
    retryWithBackoff(
      async () => {
        const config = await client.discovery(
          new URL(authOptions.oidcIssuer),
          authOptions.oidcClientId,
          authOptions.oidcClientSecret,
        );

        this.#config = config;
        this.#initialized = true;
      },
      {
        maxRetries: Number.POSITIVE_INFINITY,
        baseDelayMs: 2000,
        maxDelayMs: 30_000,
        jitterFactor: 0.3,
        onRetry: (attempt, error, delayMs) => {
          const message = error instanceof Error ? error.message : String(error);
          this.healthRegistry.markUnavailable(DEPENDENCY_NAME, message);
          this.logger.warn(
            `OIDC discovery attempt #${attempt} failed. Retrying in ${delayMs}ms: ${message}`,
            "OpenidConnect",
          );
        },
      },
    )
      .then(() => {
        this.healthRegistry.markHealthy(DEPENDENCY_NAME);
        this.logger.log("OIDC discovery completed successfully.", "OpenidConnect");
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : String(err);
        this.logger.error(
          `OIDC connection loop terminated unexpectedly: ${message}`,
          undefined,
          "OpenidConnect",
        );
      });
  }
}
