import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { IdentityProviderModule } from "@/shared";
import { IntegrationDatabaseModule } from "./database/integration-database.module";
import { GqlExceptionFilter } from "./graphql/exception-filters/GqlExceptionFilter";
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
      useClass: GqlExceptionFilter,
    },
  ],
})
export class IntegrationsModule {
}
