import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { IdentityProviderModule } from "@/shared";
import { GqlExceptionFilter } from "./graphql/exception-filters/GqlExceptionFilter";
import { IntegrationGraphQLModule } from "./graphql/integration-graphql.module";
import { IntegrationHttpModule } from "./http";
import { IntegrationDatabaseModule } from "@/v2/infrastructure.database/integration-database.module";

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
export class IntegrationsModule {}
