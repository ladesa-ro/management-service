import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { ModalidadeModule } from "@/modules/ensino/modalidade/modalidade.module";
import {
  OFERTA_FORMACAO_REPOSITORY_PORT,
  OfertaFormacaoService,
} from "@/modules/ensino/oferta-formacao";
import { OfertaFormacaoAuthzRegistrySetup } from "@/modules/ensino/oferta-formacao/infrastructure";
import { OfertaFormacaoTypeOrmRepositoryAdapter } from "@/modules/ensino/oferta-formacao/infrastructure/persistence/typeorm";
import { OfertaFormacaoGraphqlResolver } from "@/modules/ensino/oferta-formacao/presentation/graphql/oferta-formacao.graphql.resolver";
import { OfertaFormacaoRestController } from "@/modules/ensino/oferta-formacao/presentation/rest/oferta-formacao.rest.controller";

@Module({
  imports: [ModalidadeModule],
  controllers: [OfertaFormacaoRestController],
  providers: [
    NestJsPaginateAdapter,
    OfertaFormacaoService,
    OfertaFormacaoAuthzRegistrySetup,
    OfertaFormacaoGraphqlResolver,
    {
      provide: OFERTA_FORMACAO_REPOSITORY_PORT,
      useClass: OfertaFormacaoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [OfertaFormacaoService],
})
export class OfertaFormacaoModule {}
