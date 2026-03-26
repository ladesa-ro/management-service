import { Logger, Provider } from "@nestjs/common";
import type { IAuthOptions } from "@/infrastructure.identity-provider/options/auth-options.interface";
import { IAuthOptions as IAuthOptionsToken } from "@/infrastructure.identity-provider/options/auth-options.interface";
import type { IConfigService } from "../../config-service/config-service.interface";
import { IConfigService as IConfigServiceToken } from "../../config-service/config-service.interface";
import { ConfigTokens } from "../../config-tokens";

export const AuthOptionsProvider: Provider = {
  provide: IAuthOptionsToken,
  useFactory: (configService: IConfigService): IAuthOptions | null => {
    const oidcIssuer = configService.get<string>(ConfigTokens.AuthOptions.Oidc.Issuer);
    const oidcClientId = configService.get<string>(ConfigTokens.AuthOptions.Oidc.ClientId);
    const oidcClientSecret = configService.get<string>(ConfigTokens.AuthOptions.Oidc.ClientSecret);

    const keycloakBaseUrl = configService.get<string>(ConfigTokens.AuthOptions.Keycloak.BaseUrl);
    const keycloakRealm = configService.get<string>(ConfigTokens.AuthOptions.Keycloak.Realm);
    const keycloakClientId = configService.get<string>(ConfigTokens.AuthOptions.Keycloak.ClientId);
    const keycloakClientSecret = configService.get<string>(
      ConfigTokens.AuthOptions.Keycloak.ClientSecret,
    );

    if (
      !oidcIssuer ||
      !oidcClientId ||
      !oidcClientSecret ||
      !keycloakBaseUrl ||
      !keycloakRealm ||
      !keycloakClientId ||
      !keycloakClientSecret
    ) {
      Logger.warn(
        "Auth/Keycloak credentials not fully configured. Identity provider features will be unavailable.",
        "AppConfig",
      );
      return null;
    }

    const keycloakPasswordResetRedirectUri =
      configService.get<string>(ConfigTokens.AuthOptions.Keycloak.PasswordResetRedirectUri) ??
      "https://dev.ladesa.com.br";

    return {
      oidcIssuer,
      oidcClientId,
      oidcClientSecret,
      keycloakBaseUrl,
      keycloakRealm,
      keycloakClientId,
      keycloakClientSecret,
      keycloakPasswordResetRedirectUri,
    };
  },
  inject: [IConfigServiceToken],
};
