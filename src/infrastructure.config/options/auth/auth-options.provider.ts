import { Provider } from "@nestjs/common";
import type { IAuthOptions } from "@/infrastructure.identity-provider/options/auth-options.interface";
import { IAuthOptions as IAuthOptionsToken } from "@/infrastructure.identity-provider/options/auth-options.interface";
import type { IConfigService } from "../../config-service/config-service.interface";
import { IConfigService as IConfigServiceToken } from "../../config-service/config-service.interface";
import { ConfigTokens } from "../../config-tokens";

export const AuthOptionsProvider: Provider = {
  provide: IAuthOptionsToken,
  useFactory: (configService: IConfigService): IAuthOptions => {
    const oidcIssuer = configService.get<string>(ConfigTokens.AuthOptions.Oidc.Issuer);
    const oidcClientId = configService.get<string>(ConfigTokens.AuthOptions.Oidc.ClientId);
    const oidcClientSecret = configService.get<string>(ConfigTokens.AuthOptions.Oidc.ClientSecret);

    if (oidcIssuer === undefined || oidcClientId === undefined || oidcClientSecret === undefined) {
      throw new Error("Please provide correct OAUTH2_CLIENT credentials.");
    }

    const keycloakBaseUrl = configService.get<string>(ConfigTokens.AuthOptions.Keycloak.BaseUrl);
    const keycloakRealm = configService.get<string>(ConfigTokens.AuthOptions.Keycloak.Realm);
    const keycloakClientId = configService.get<string>(ConfigTokens.AuthOptions.Keycloak.ClientId);
    const keycloakClientSecret = configService.get<string>(
      ConfigTokens.AuthOptions.Keycloak.ClientSecret,
    );

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
