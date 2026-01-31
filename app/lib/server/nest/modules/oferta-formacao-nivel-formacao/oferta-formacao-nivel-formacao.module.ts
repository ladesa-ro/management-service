import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/@shared/infrastructure/persistence/typeorm";
import {
  OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT,
  OfertaFormacaoNivelFormacaoService,
} from "@/modules/oferta-formacao-nivel-formacao";
import { OfertaFormacaoNivelFormacaoTypeOrmRepositoryAdapter } from "@/modules/oferta-formacao-nivel-formacao/infrastructure/persistence/typeorm";
import { NivelFormacaoModule } from "@/server/nest/modules/nivel-formacao";
import { OfertaFormacaoModule } from "@/server/nest/modules/oferta-formacao";
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
