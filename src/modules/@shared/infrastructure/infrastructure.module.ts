import { Module } from "@nestjs/common";
import { AppConfigModule } from "@/infrastructure.config";
import { DatabaseModule } from "@/infrastructure.database/database.module";
import { IdentityProviderModule } from "@/infrastructure.identity-provider/identity-provider.module";
import { AuthModule } from "@/server/nest/auth";
import { GraphqlModule } from "./graphql";

@Module({
  imports: [AppConfigModule, DatabaseModule, GraphqlModule, IdentityProviderModule, AuthModule],
})
export class InfrastructureModule {}
