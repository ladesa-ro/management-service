import { Module } from "@nestjs/common";
import { ModalidadeModule } from "@/Ladesa.Management.Application/ensino/modalidade/modalidade.module";
import {
  IOfertaFormacaoRepository,
  OfertaFormacaoService,
} from "@/Ladesa.Management.Application/ensino/oferta-formacao";
import { OfertaFormacaoAuthzRegistrySetup } from "@/Ladesa.Management.Application/ensino/oferta-formacao/infrastructure";
import { OfertaFormacaoTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/ensino/oferta-formacao/infrastructure/persistence/typeorm";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { OfertaFormacaoGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/OfertaFormacaoGraphqlResolver";
import { OfertaFormacaoRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/OfertaFormacaoRestController";

@Module({
  imports: [ModalidadeModule],
  controllers: [OfertaFormacaoRestController],
  providers: [
    NestJsPaginateAdapter,
    OfertaFormacaoService,
    OfertaFormacaoAuthzRegistrySetup,
    OfertaFormacaoGraphqlResolver,
    {
      provide: IOfertaFormacaoRepository,
      useClass: OfertaFormacaoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [OfertaFormacaoService],
})
export class OfertaFormacaoModule {}
