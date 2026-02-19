import KeycloakAdminClient from "@keycloak/keycloak-admin-client";
import type { Credentials } from "@keycloak/keycloak-admin-client/lib/utils/auth";
import { Inject, Injectable } from "@nestjs/common";
import { wait } from "@/modules/@shared";
import { CONFIG_PORT, type IConfigPort } from "@/modules/@shared/application/ports/out/config";

const INTERVAL_AUTH = 58 * 1000;

/**
 * Serviço para integração com Keycloak Admin API.
 */
@Injectable()
export class KeycloakService {
  kcAdminClient: KeycloakAdminClient | null = null;
  #initialized = false;
  #authInterval: NodeJS.Timeout | null = null;

  constructor(
    @Inject(CONFIG_PORT)
    readonly appConfigService: IConfigPort,
  ) {}

  get keycloakConfigCredentials() {
    return this.appConfigService.getKeycloakConfigCredentials();
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
        const keycloakConfigCredentials = this.keycloakConfigCredentials;

        this.kcAdminClient = new KeycloakAdminClient({
          baseUrl: keycloakConfigCredentials.baseUrl,
          realmName: keycloakConfigCredentials.realm,
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
    const keycloakConfigCredentials = this.keycloakConfigCredentials;
    const kcAdminClient = this.kcAdminClient;

    if (kcAdminClient) {
      const currentRealm = kcAdminClient.realmName;

      kcAdminClient.setConfig({
        realmName: keycloakConfigCredentials.realm,
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

  async findUserByMatriculaSiape(matriculaSiape: string) {
    const kcAdminClient = await this.getAdminClient();
    const [userRepresentation] = await kcAdminClient.users.find(
      { q: `usuario.matriculaSiape:${matriculaSiape}` },
      { catchNotFound: true },
    );
    return userRepresentation;
  }

  private getClientAuthCredentials(): Credentials {
    const keycloakConfigCredentials = this.keycloakConfigCredentials;

    return {
      grantType: "client_credentials",
      clientId: keycloakConfigCredentials.clientId,
      clientSecret: keycloakConfigCredentials.clientSecret,
    };
  }

  private async clearAuthInterval(): Promise<void> {
    if (this.#authInterval !== null) {
      clearInterval(this.#authInterval);
      this.#authInterval = null;
    }
  }
}
