import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { IntegrationDatabaseModule } from "./database/integration-database.module";
import { IntegrationGraphQLModule } from "./graphql";
import { GqlExceptionFilter } from "./graphql/exception-filters/GqlExceptionFilter";
import { IntegrationHttpModule } from "./http";
import { IdentityProviderModule } from "./identity-provider/identity-provider.module";

@Module({
  imports: [
    //
    IntegrationDatabaseModule,
    IntegrationGraphQLModule,
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
