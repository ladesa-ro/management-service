import { Module } from "@nestjs/common";
import { IntegrationDatabaseModule } from "./database/integration-database.module";
import { IntegrationHttpModule } from "./http";
import { IdentityProviderModule } from "./identity-provider/identity-provider.module";

@Module({
  imports: [
    IntegrationDatabaseModule,
    IntegrationHttpModule,
    IdentityProviderModule,
  ],
  providers: [],
})
export class IntegrationsModule {}
