import { Module } from "@nestjs/common";
import { AuthenticationCoreModule } from "@/Ladesa.Management.Application/@seguranca/autenticacao";
import { IdentityProviderCoreModule } from "@/Ladesa.Management.Application/@seguranca/provedor-identidade";
import { AppConfigModule } from "@/Ladesa.Management.Infrastructure.Config";
import { TypeormModule } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { GraphqlModule } from "./graphql";

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
