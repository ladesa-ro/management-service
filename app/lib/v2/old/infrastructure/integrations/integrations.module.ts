/**
 * @deprecated Este módulo será removido na próxima versão major.
 * Use os módulos diretamente de seus respectivos pacotes:
 * - `import { TypeormModule } from "@/modules/@shared/infrastructure/persistence/typeorm"`
 * - `import { DatabaseContextModule } from "@/modules/@database-context"`
 * - `import { GraphqlModule } from "@/modules/@shared/infrastructure/graphql"`
 * - `import { IdentityProviderCoreModule } from "@/modules/@core/identity-provider"`
 */
import { Module } from "@nestjs/common";
import { IdentityProviderCoreModule } from "@/modules/@core/identity-provider";
import { DatabaseContextModule } from "@/modules/@database-context";
import { GraphqlModule } from "@/modules/@shared/infrastructure/graphql";
import { TypeormModule } from "@/modules/@shared/infrastructure/persistence/typeorm";

@Module({
  imports: [TypeormModule, DatabaseContextModule, GraphqlModule, IdentityProviderCoreModule],
})
export class IntegrationsModule {}
