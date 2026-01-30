import { Module } from "@nestjs/common";
import { IntegrationDatabaseModule } from "@/v2/adapters/out/persistence/typeorm/integration-database.module";
import { IdentityProviderModule } from "@/v2/old/shared";
import { IntegrationHttpModule } from "./http";

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
