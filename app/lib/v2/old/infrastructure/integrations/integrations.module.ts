import { Module } from "@nestjs/common";
import { IntegrationDatabaseModule } from "@/v2/adapters/out/persistence/typeorm/integration-database.module";
import { IntegrationHttpModule } from "./http";
import { IdentityProviderModule } from "./identity-provider";

@Module({
  imports: [
    IntegrationDatabaseModule,
    // IntegrationGraphQLModule,
    IntegrationHttpModule,
    IdentityProviderModule,
    // MessageBrokerModule,
  ],
})
export class IntegrationsModule {}
