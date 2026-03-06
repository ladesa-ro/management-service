import { Module } from "@nestjs/common";
import { ModalidadeModule } from "@/Ladesa.Management.Application/ensino/modalidade/modalidade.module";
import {
  OFERTA_FORMACAO_REPOSITORY_PORT,
  OfertaFormacaoService,
} from "@/Ladesa.Management.Application/ensino/oferta-formacao";
import { OfertaFormacaoAuthzRegistrySetup } from "@/Ladesa.Management.Application/ensino/oferta-formacao/infrastructure";
import { OfertaFormacaoTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/ensino/oferta-formacao/infrastructure/persistence/typeorm";
import { OfertaFormacaoGraphqlResolver } from "@/Ladesa.Management.Application/ensino/oferta-formacao/presentation/graphql/oferta-formacao.graphql.resolver";
import { OfertaFormacaoRestController } from "@/Ladesa.Management.Application/ensino/oferta-formacao/presentation/rest/oferta-formacao.rest.controller";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
