import { Module } from "@nestjs/common";
import { AppConfigModule } from "@/infrastructure.config";
import { DatabaseModule } from "@/infrastructure.database/database.module";
import { GraphqlModule } from "@/infrastructure.graphql";
import { IdentityProviderModule } from "@/infrastructure.identity-provider/identity-provider.module";
import { AuthModule } from "@/server/nest/auth";

@Module({
  imports: [AppConfigModule, DatabaseModule, GraphqlModule, IdentityProviderModule, AuthModule],
})
export class InfrastructureModule {}
