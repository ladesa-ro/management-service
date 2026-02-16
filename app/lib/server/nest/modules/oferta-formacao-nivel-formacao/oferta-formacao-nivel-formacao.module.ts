import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT,
  OfertaFormacaoNivelFormacaoService,
} from "@/modules/ensino/oferta-formacao-nivel-formacao";
import { OfertaFormacaoNivelFormacaoAuthzRegistrySetup } from "@/modules/ensino/oferta-formacao-nivel-formacao/infrastructure";
import { OfertaFormacaoNivelFormacaoTypeOrmRepositoryAdapter } from "@/modules/ensino/oferta-formacao-nivel-formacao/infrastructure/persistence/typeorm";
import { OfertaFormacaoNivelFormacaoGraphqlResolver } from "@/modules/ensino/oferta-formacao-nivel-formacao/presentation/graphql/oferta-formacao-nivel-formacao.graphql.resolver";
import { OfertaFormacaoNivelFormacaoRestController } from "@/modules/ensino/oferta-formacao-nivel-formacao/presentation/rest/oferta-formacao-nivel-formacao.rest.controller";
import { NivelFormacaoModule } from "@/server/nest/modules/nivel-formacao";
import { OfertaFormacaoModule } from "@/server/nest/modules/oferta-formacao";

@Module({
  imports: [OfertaFormacaoModule, NivelFormacaoModule],
  controllers: [OfertaFormacaoNivelFormacaoRestController],
  providers: [
    NestJsPaginateAdapter,
    OfertaFormacaoNivelFormacaoService,
    OfertaFormacaoNivelFormacaoAuthzRegistrySetup,
    OfertaFormacaoNivelFormacaoGraphqlResolver,
    {
      provide: OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT,
      useClass: OfertaFormacaoNivelFormacaoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [OfertaFormacaoNivelFormacaoService],
})
export class OfertaFormacaoNivelFormacaoModule {}
