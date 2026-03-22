import KeycloakAdminClient from "@keycloak/keycloak-admin-client";
import type { Credentials } from "@keycloak/keycloak-admin-client/lib/utils/auth";
import { ILoggerPort, ILoggerPort as ILoggerPortToken } from "@/domain/abstractions/logging";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { wait } from "@/utils/wait";
import type { IAuthOptions } from "../options/auth-options.interface";
import { IAuthOptions as IAuthOptionsToken } from "../options/auth-options.interface";

const INTERVAL_AUTH = 58 * 1000;

@DeclareImplementation()
export class KeycloakService {
  kcAdminClient: KeycloakAdminClient | null = null;
  #initialized = false;
  #authInterval: NodeJS.Timeout | null = null;

  constructor(
    @DeclareDependency(IAuthOptionsToken)
    readonly authOptions: IAuthOptions,
    @DeclareDependency(ILoggerPortToken)
    private readonly logger: ILoggerPort,
  ) {}

  get keycloakConfigCredentials() {
    return {
      baseUrl: this.authOptions.keycloakBaseUrl,
      realm: this.authOptions.keycloakRealm,
      clientId: this.authOptions.keycloakClientId,
      clientSecret: this.authOptions.keycloakClientSecret,
    };
  }

  async setupAuthInterval(): Promise<void> {
    await this.clearAuthInterval();

    this.#authInterval = setInterval(() => {
      this.authenticate();
    }, INTERVAL_AUTH);
  }

  async setup(): Promise<boolean> {
    if (!this.#initialized) {
      try {
        this.kcAdminClient = new KeycloakAdminClient({
          baseUrl: this.authOptions.keycloakBaseUrl,
          realmName: this.authOptions.keycloakRealm,
        });

        await this.authenticate();
        await this.setupAuthInterval();

        this.#initialized = true;
      } catch (error) {
        this.logger.error(
          "Can not connect to KeyCloak.",
          error instanceof Error ? error.stack : undefined,
          "KeycloakService",
        );
        await this.clearAuthInterval();
      }
    }

    return this.#initialized;
  }

  async authenticate(): Promise<void> {
    const kcAdminClient = this.kcAdminClient;

    if (kcAdminClient) {
      const currentRealm = kcAdminClient.realmName;

      kcAdminClient.setConfig({
        realmName: this.authOptions.keycloakRealm,
      });

      const credentials = this.getClientAuthCredentials();

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

  async getAdminClient(maxRetries = 3): Promise<KeycloakAdminClient> {
    let retryCount = 0;

    do {
      const result = await this.setup();

      if (!result) {
        await wait(retryCount * 500);
        retryCount++;
      }
    } while (!this.#initialized && retryCount < maxRetries);

    const kcAdminClient = this.kcAdminClient;

    if (kcAdminClient) {
      return kcAdminClient;
    }

    throw new Error("[KeycloakService::error] kcAdminClient is null");
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

  private getClientAuthCredentials(): Credentials {
    return {
      grantType: "client_credentials",
      clientId: this.authOptions.keycloakClientId,
      clientSecret: this.authOptions.keycloakClientSecret,
    };
  }

  private async clearAuthInterval(): Promise<void> {
    if (this.#authInterval !== null) {
      clearInterval(this.#authInterval);
      this.#authInterval = null;
    }
  }
}
