import { Module } from "@nestjs/common";
import { NivelFormacaoModule } from "@/Ladesa.Management.Application/ensino/nivel-formacao/nivel-formacao.module";
import { OfertaFormacaoModule } from "@/Ladesa.Management.Application/ensino/oferta-formacao/oferta-formacao.module";
import {
  IOfertaFormacaoNivelFormacaoRepository,
  OfertaFormacaoNivelFormacaoService,
} from "@/Ladesa.Management.Application/ensino/oferta-formacao-nivel-formacao";
import { OfertaFormacaoNivelFormacaoAuthzRegistrySetup } from "@/Ladesa.Management.Application/ensino/oferta-formacao-nivel-formacao/infrastructure";
import { OfertaFormacaoNivelFormacaoTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Infrastructure.Database/Repositories/OfertaFormacaoNivelFormacaoRepositoryAdapter";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { OfertaFormacaoNivelFormacaoGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/OfertaFormacaoNivelFormacaoGraphqlResolver";
import { OfertaFormacaoNivelFormacaoRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/OfertaFormacaoNivelFormacaoRestController";

@Module({
  imports: [OfertaFormacaoModule, NivelFormacaoModule],
  controllers: [OfertaFormacaoNivelFormacaoRestController],
  providers: [
    NestJsPaginateAdapter,
    OfertaFormacaoNivelFormacaoService,
    OfertaFormacaoNivelFormacaoAuthzRegistrySetup,
    OfertaFormacaoNivelFormacaoGraphqlResolver,
    {
      provide: IOfertaFormacaoNivelFormacaoRepository,
      useClass: OfertaFormacaoNivelFormacaoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [OfertaFormacaoNivelFormacaoService],
})
export class OfertaFormacaoNivelFormacaoModule {}
