import { Module } from "@nestjs/common";
import { IntegrationDatabaseModule } from "./database/integration-database.module";
import { IdentityProviderModule } from "./identity-provider/identity-provider.module";

@Module({
  imports: [
    IntegrationDatabaseModule,
    IdentityProviderModule,
  ],
  providers: [],
})
export class IntegrationsModule {}
