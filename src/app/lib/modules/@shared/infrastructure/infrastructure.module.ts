import { Module } from "@nestjs/common";
import { AuthenticationCoreModule } from "@/modules/@seguranca/autenticacao";
import { IdentityProviderCoreModule } from "@/modules/@seguranca/provedor-identidade";
import { AppConfigModule } from "@/Ladesa.Management.Infrastructure.Config";
import { GraphqlModule } from "./graphql";
import { TypeormModule } from "./persistence/typeorm";

@Module({
  imports: [
    AppConfigModule,
    TypeormModule,
    GraphqlModule,
    IdentityProviderCoreModule,
    AuthenticationCoreModule,
  ],
})
export class InfrastructureModule {}
