import { Module } from "@nestjs/common";
import { DatabaseContextModule } from "@/modules/@database-context";
import { GraphqlModule } from "@/modules/@shared/infrastructure/graphql";
import { TypeormModule } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { IdentityProviderModule } from "./identity-provider";

@Module({
  imports: [TypeormModule, DatabaseContextModule, GraphqlModule, IdentityProviderModule],
})
export class IntegrationsModule {}
