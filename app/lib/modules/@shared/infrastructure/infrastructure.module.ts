import { Module } from "@nestjs/common";
import { AuthenticationCoreModule } from "@/modules/@core/authentication";
import { IdentityProviderCoreModule } from "@/modules/@core/identity-provider";
import { DatabaseContextModule } from "@/modules/@database-context";
import { AppConfigModule } from "@/server/nest/modules/config";
import { GraphqlModule } from "./graphql";
import { MessageBrokerModule } from "./message-broker";
import { TypeormModule } from "./persistence/typeorm";

@Module({
  imports: [
    AppConfigModule,
    TypeormModule,
    DatabaseContextModule,
    GraphqlModule,
    IdentityProviderCoreModule,
    AuthenticationCoreModule,
    MessageBrokerModule,
  ],
})
export class InfrastructureModule {}
