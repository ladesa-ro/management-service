import { Module } from "@nestjs/common";
import {
  OfertaFormacaoNivelFormacaoService,
  OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT,
} from "@/core/oferta-formacao-nivel-formacao";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { NivelFormacaoModule } from "@/server/nest/modules/nivel-formacao";
import { OfertaFormacaoModule } from "@/v2/server/modules/oferta-formacao";
import { OfertaFormacaoNivelFormacaoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters/oferta-formacao-nivel-formacao-typeorm.repository.adapter";
import { OfertaFormacaoNivelFormacaoController } from "./http";

@Module({
  imports: [OfertaFormacaoModule, NivelFormacaoModule],
  controllers: [OfertaFormacaoNivelFormacaoController],
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
