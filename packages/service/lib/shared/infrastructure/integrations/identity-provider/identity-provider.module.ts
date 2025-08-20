import { Module } from "@nestjs/common";
import { IdentityProviderService } from "./identity-provider.service";
import { JwksRsaClientModule } from "./jwks-rsa-client";
import { KeycloakModule } from "./keycloak";
import { OpenidConnectModule } from "./openid-connect";

@Module({
  imports: [JwksRsaClientModule, OpenidConnectModule, KeycloakModule],
  providers: [IdentityProviderService],
  exports: [IdentityProviderService],
})
export class IdentityProviderModule {}
