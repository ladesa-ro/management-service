import { Module } from "@nestjs/common";
import { KeycloakService } from "./domain/keycloak.service";

@Module({
  providers: [KeycloakService],
  exports: [KeycloakService],
})
export class KeycloakModule {
}
