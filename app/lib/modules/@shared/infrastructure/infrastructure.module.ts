import { Module } from "@nestjs/common";
import { AuthenticationCoreModule } from "@/modules/@core/autenticacao";
import { IdentityProviderCoreModule } from "@/modules/@core/provedor-identidade";
import { AppConfigModule } from "./config";
import { GraphqlModule } from "./graphql";
import { MessageBrokerModule } from "./message-broker";
import { TypeormModule } from "./persistence/typeorm";

@Module({
  imports: [
    AppConfigModule,
    TypeormModule,
    GraphqlModule,
    IdentityProviderCoreModule,
    AuthenticationCoreModule,
    MessageBrokerModule,
  ],
})
export class InfrastructureModule {}
