import { Module } from "@nestjs/common";
import {
  IdentityProviderService,
  JwksRsaClientModule,
  KeycloakModule,
  OpenidConnectModule,
} from "./infrastructure";
import { IDENTITY_PROVIDER_PORT } from "./ports";

/**
 * Módulo de Identity Provider.
 * Fornece integração com Keycloak, OIDC e JWKS.
 */
@Module({
  imports: [OpenidConnectModule, JwksRsaClientModule, KeycloakModule],
  providers: [
    IdentityProviderService,
    {
      provide: IDENTITY_PROVIDER_PORT,
      useExisting: IdentityProviderService,
    },
  ],
  exports: [IDENTITY_PROVIDER_PORT, IdentityProviderService, KeycloakModule],
})
export class IdentityProviderCoreModule {}
