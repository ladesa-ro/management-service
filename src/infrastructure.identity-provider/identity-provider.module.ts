import { Module } from "@nestjs/common";
import {
  IIdentityProvider,
  IIdpTokenService,
  IIdpUserService,
} from "@/domain/abstractions/identity-provider";
import { IdentityProviderService } from "./identity-provider.service";
import { JwksRsaClientService } from "./jwks/jwks-rsa-client.service";
import { KeycloakService } from "./keycloak/keycloak.service";
import { KeycloakUserService } from "./keycloak/keycloak-user.service";
import { OpenidConnectService } from "./openid-connect/openid-connect.service";
import { OpenidConnectTokenService } from "./openid-connect/openid-connect-token.service";

@Module({
  providers: [
    OpenidConnectService,
    JwksRsaClientService,
    KeycloakService,
    KeycloakUserService,
    OpenidConnectTokenService,
    IdentityProviderService,
    {
      provide: IIdentityProvider,
      useExisting: IdentityProviderService,
    },
    {
      provide: IIdpUserService,
      useExisting: KeycloakUserService,
    },
    {
      provide: IIdpTokenService,
      useExisting: OpenidConnectTokenService,
    },
  ],
  exports: [IIdentityProvider, IIdpUserService, IIdpTokenService],
})
export class IdentityProviderModule {}
