import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { AppExceptionFilter } from "@/infrastructure/integrations/nestjs/api.exception-filter";
import { IdentityProviderModule } from "@/shared-antigo";
import { IntegrationDatabaseModule } from "./database/integration-database.module";
import { IntegrationHttpModule } from "./http";

@Module({
  imports: [
    IntegrationDatabaseModule,
    // IntegrationGraphQLModule,
    IntegrationHttpModule,
    IdentityProviderModule,
    // MessageBrokerModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
  ],
})
export class IntegrationsModule {}
