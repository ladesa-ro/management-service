import KeycloakAdminClient from "@keycloak/keycloak-admin-client";
import type { Credentials } from "@keycloak/keycloak-admin-client/lib/utils/auth";
import { type OnModuleInit } from "@nestjs/common";
import { ServiceUnavailableError } from "@/application/errors";
import { ILoggerPort, ILoggerPort as ILoggerPortToken } from "@/domain/abstractions/logging";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IConnectionHealthRegistry } from "@/shared/resilience/connection-health-registry.interface";
import { retryWithBackoff } from "@/shared/resilience/retry-with-backoff";
import type { IAuthOptions } from "../options/auth-options.interface";
import { IAuthOptions as IAuthOptionsToken } from "../options/auth-options.interface";

const INTERVAL_AUTH = 58 * 1000;
const DEPENDENCY_NAME = "keycloak";

@Impl()
export class KeycloakService implements OnModuleInit {
  #kcAdminClient: KeycloakAdminClient | null = null;
  #initialized = false;
  #authInterval: NodeJS.Timeout | null = null;

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
      this.healthRegistry.markUnavailable(DEPENDENCY_NAME, "Keycloak not configured");
      return;
    }

    this.#startConnectionLoop(this.authOptions);
  }

  get keycloakConfigCredentials() {
    return this.authOptions
      ? {
          baseUrl: this.authOptions.keycloakBaseUrl,
          realm: this.authOptions.keycloakRealm,
          clientId: this.authOptions.keycloakClientId,
          clientSecret: this.authOptions.keycloakClientSecret,
        }
      : null;
  }

  async getAdminClient(): Promise<KeycloakAdminClient> {
    if (this.#initialized && this.#kcAdminClient) {
      return this.#kcAdminClient;
    }

    throw new ServiceUnavailableError(undefined, DEPENDENCY_NAME);
  }

  async findUserByMatricula(matricula: string) {
    const kcAdminClient = await this.getAdminClient();
    const [userByMatricula] = await kcAdminClient.users.find(
      { q: `usuario.matricula:${matricula}` },
      { catchNotFound: true },
    );

    if (userByMatricula) {
      return userByMatricula;
    }

    const [legacyUser] = await kcAdminClient.users.find(
      { q: `usuario.matriculaSiape:${matricula}` },
      { catchNotFound: true },
    );

    return legacyUser;
  }

  async #authenticate(authOptions: IAuthOptions): Promise<void> {
    const kcAdminClient = this.#kcAdminClient;

    if (kcAdminClient) {
      const currentRealm = kcAdminClient.realmName;

      kcAdminClient.setConfig({
        realmName: authOptions.keycloakRealm,
      });

      const credentials = this.#buildClientAuthCredentials(authOptions);

      try {
        await kcAdminClient.auth(credentials);
      } catch (e) {
        this.logger.error("Can not connect to KeyCloak.", undefined, "KeycloakService");
        throw e;
      } finally {
        kcAdminClient.setConfig({ realmName: currentRealm });
      }
    }
  }

  #startConnectionLoop(authOptions: IAuthOptions): void {
    retryWithBackoff(
      async () => {
        this.#kcAdminClient = new KeycloakAdminClient({
          baseUrl: authOptions.keycloakBaseUrl,
          realmName: authOptions.keycloakRealm,
        });

        await this.#authenticate(authOptions);
        this.#setupAuthInterval(authOptions);

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
          this.#clearAuthInterval();
          this.logger.warn(
            `Keycloak connection attempt #${attempt} failed. Retrying in ${delayMs}ms: ${message}`,
            "KeycloakService",
          );
        },
      },
    )
      .then(() => {
        this.healthRegistry.markHealthy(DEPENDENCY_NAME);
        this.logger.log("Keycloak connection established.", "KeycloakService");
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : String(err);
        this.logger.error(
          `Keycloak connection loop terminated unexpectedly: ${message}`,
          undefined,
          "KeycloakService",
        );
      });
  }

  #setupAuthInterval(authOptions: IAuthOptions): void {
    this.#clearAuthInterval();

    this.#authInterval = setInterval(() => {
      this.#authenticate(authOptions);
    }, INTERVAL_AUTH);
  }

  #buildClientAuthCredentials(authOptions: IAuthOptions): Credentials {
    return {
      grantType: "client_credentials",
      clientId: authOptions.keycloakClientId,
      clientSecret: authOptions.keycloakClientSecret,
    };
  }

  #clearAuthInterval(): void {
    if (this.#authInterval !== null) {
      clearInterval(this.#authInterval);
      this.#authInterval = null;
    }
  }
}
