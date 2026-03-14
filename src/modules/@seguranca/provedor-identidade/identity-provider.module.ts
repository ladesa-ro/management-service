import { Module } from "@nestjs/common";
import {
  IdentityProviderService,
  JwksRsaClientModule,
  KeycloakModule,
  OpenidConnectModule,
} from "./infrastructure";
import { IIdentityProvider } from "./ports";

/**
 * Módulo de Identity Provider.
 * Fornece integração com Keycloak, OIDC e JWKS.
 */
@Module({
  imports: [OpenidConnectModule, JwksRsaClientModule, KeycloakModule],
  providers: [
    IdentityProviderService,
    {
      provide: IIdentityProvider,
      useExisting: IdentityProviderService,
    },
  ],
  exports: [IIdentityProvider, IdentityProviderService, KeycloakModule],
})
export class IdentityProviderCoreModule {}
