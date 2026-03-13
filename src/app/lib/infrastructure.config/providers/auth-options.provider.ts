import { Provider } from "@nestjs/common";
import type { IAuthOptions } from "../options/auth-options.interface";
import { IAuthOptions as IAuthOptionsToken } from "../options/auth-options.interface";
import type { IConfigService } from "../config-service.interface";
import { IConfigService as IConfigServiceToken } from "../config-service.interface";
import { EnvKeys } from "../env-keys";

export const AuthOptionsProvider: Provider = {
  provide: IAuthOptionsToken,
  useFactory: (configService: IConfigService): IAuthOptions => {
    const oidcIssuer = configService.get<string>(EnvKeys.OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER);
    const oidcClientId = configService.get<string>(EnvKeys.OAUTH2_CLIENT_REGISTRATION_LOGIN_CLIENT_ID);
    const oidcClientSecret = configService.get<string>(EnvKeys.OAUTH2_CLIENT_REGISTRATION_LOGIN_CLIENT_SECRET);

    if (oidcIssuer === undefined || oidcClientId === undefined || oidcClientSecret === undefined) {
      throw new Error("Please provide correct OAUTH2_CLIENT credentials.");
    }

    const keycloakBaseUrl = configService.get<string>(EnvKeys.KC_BASE_URL);
    const keycloakRealm = configService.get<string>(EnvKeys.KC_REALM);
    const keycloakClientId = configService.get<string>(EnvKeys.KC_CLIENT_ID);
    const keycloakClientSecret = configService.get<string>(EnvKeys.KC_CLIENT_SECRET);

    if (!keycloakBaseUrl) {
      throw new Error("KeyCloak baseUrl config not provided.");
    }
    if (!keycloakRealm) {
      throw new Error("KeyCloak realm config not provided.");
    }
    if (!keycloakClientId) {
      throw new Error("KeyCloak clientId config not provided.");
    }
    if (!keycloakClientSecret) {
      throw new Error("KeyCloak clientSecret config not provided.");
    }

    return {
      oidcIssuer,
      oidcClientId,
      oidcClientSecret,
      keycloakBaseUrl,
      keycloakRealm,
      keycloakClientId,
      keycloakClientSecret,
    };
  },
  inject: [IConfigServiceToken],
};
