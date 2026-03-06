import { Module } from "@nestjs/common";
import { NivelFormacaoModule } from "@/Ladesa.Management.Application/ensino/nivel-formacao/nivel-formacao.module";
import { OfertaFormacaoModule } from "@/Ladesa.Management.Application/ensino/oferta-formacao/oferta-formacao.module";
import {
  OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT,
  OfertaFormacaoNivelFormacaoService,
} from "@/Ladesa.Management.Application/ensino/oferta-formacao-nivel-formacao";
import { OfertaFormacaoNivelFormacaoAuthzRegistrySetup } from "@/Ladesa.Management.Application/ensino/oferta-formacao-nivel-formacao/infrastructure";
import { OfertaFormacaoNivelFormacaoTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/ensino/oferta-formacao-nivel-formacao/infrastructure/persistence/typeorm";
import { OfertaFormacaoNivelFormacaoGraphqlResolver } from "@/Ladesa.Management.Application/ensino/oferta-formacao-nivel-formacao/presentation/graphql/oferta-formacao-nivel-formacao.graphql.resolver";
import { OfertaFormacaoNivelFormacaoRestController } from "@/Ladesa.Management.Application/ensino/oferta-formacao-nivel-formacao/presentation/rest/oferta-formacao-nivel-formacao.rest.controller";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
