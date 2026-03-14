import { Module } from "@nestjs/common";
import { AppConfigModule } from "@/infrastructure.config";
import { IdentityProviderModule } from "@/infrastructure.identity-provider/identity-provider.module";
import { AuthModule } from "@/server/nest/auth";
import { GraphqlModule } from "./graphql";
import { TypeormModule } from "./persistence/typeorm";

@Module({
  imports: [AppConfigModule, TypeormModule, GraphqlModule, IdentityProviderModule, AuthModule],
})
export class InfrastructureModule {}
