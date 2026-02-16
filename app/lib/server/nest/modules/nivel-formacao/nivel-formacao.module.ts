import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { NIVEL_FORMACAO_REPOSITORY_PORT } from "@/modules/ensino/nivel-formacao/application/ports";
import { NivelFormacaoService } from "@/modules/ensino/nivel-formacao/application/use-cases/nivel-formacao.service";
import { NivelFormacaoAuthzRegistrySetup } from "@/modules/ensino/nivel-formacao/infrastructure";
import { NivelFormacaoTypeOrmRepositoryAdapter } from "@/modules/ensino/nivel-formacao/infrastructure/persistence/typeorm";
import { NivelFormacaoGraphqlResolver } from "@/modules/ensino/nivel-formacao/presentation/graphql/nivel-formacao.graphql.resolver";
import { NivelFormacaoRestController } from "@/modules/ensino/nivel-formacao/presentation/rest/nivel-formacao.rest.controller";

@Module({
  imports: [],
  controllers: [NivelFormacaoRestController],
  providers: [
    NestJsPaginateAdapter,
    NivelFormacaoService,
    NivelFormacaoAuthzRegistrySetup,
    NivelFormacaoGraphqlResolver,
    {
      provide: NIVEL_FORMACAO_REPOSITORY_PORT,
      useClass: NivelFormacaoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [NivelFormacaoService],
})
export class NivelFormacaoModule {}
