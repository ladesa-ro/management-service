import { Module } from "@nestjs/common";
import { DatabaseContextModule } from "@/modules/@database-context";
import { TypeormModule } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { IntegrationHttpModule } from "./http";
import { IdentityProviderModule } from "./identity-provider";

@Module({
  imports: [TypeormModule, DatabaseContextModule, IntegrationHttpModule, IdentityProviderModule],
})
export class IntegrationsModule {}
