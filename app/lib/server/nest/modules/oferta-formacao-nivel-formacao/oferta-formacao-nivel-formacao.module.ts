import { Module } from "@nestjs/common";
import {
  OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT,
  OfertaFormacaoNivelFormacaoService,
} from "@/core/oferta-formacao-nivel-formacao";
import { NivelFormacaoModule } from "@/server/nest/modules/nivel-formacao";
import { OfertaFormacaoModule } from "@/server/nest/modules/oferta-formacao";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { OfertaFormacaoNivelFormacaoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters/oferta-formacao-nivel-formacao-typeorm.repository.adapter";
import { OfertaFormacaoNivelFormacaoRestController } from "./rest/oferta-formacao-nivel-formacao.rest.controller";

@Module({
  imports: [OfertaFormacaoModule, NivelFormacaoModule],
  controllers: [OfertaFormacaoNivelFormacaoRestController],
  providers: [
    NestJsPaginateAdapter,
    OfertaFormacaoNivelFormacaoService,
    {
      provide: OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT,
      useClass: OfertaFormacaoNivelFormacaoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [OfertaFormacaoNivelFormacaoService],
})
export class OfertaFormacaoNivelFormacaoModule {}
