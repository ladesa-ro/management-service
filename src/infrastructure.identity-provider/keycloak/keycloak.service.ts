import KeycloakAdminClient from "@keycloak/keycloak-admin-client";
import type { Credentials } from "@keycloak/keycloak-admin-client/lib/utils/auth";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { wait } from "@/modules/@shared";
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
        console.error("[KeycloakService::error] Can not connect to KeyCloak.", { error });
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
        console.error("[KeycloakService::error] Can not connect to KeyCloak.");
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
