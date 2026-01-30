import { Module } from "@nestjs/common";
import { OFERTA_FORMACAO_REPOSITORY_PORT, OfertaFormacaoService } from "@/core/oferta-formacao";
import { ModalidadeModule } from "@/server/nest/modules/modalidade";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { OfertaFormacaoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { OfertaFormacaoRestController } from "./rest/oferta-formacao.rest.controller";

@Module({
  imports: [ModalidadeModule],
  controllers: [OfertaFormacaoRestController],
  providers: [
    NestJsPaginateAdapter,
    OfertaFormacaoService,
    {
      provide: OFERTA_FORMACAO_REPOSITORY_PORT,
      useClass: OfertaFormacaoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [OfertaFormacaoService],
})
export class OfertaFormacaoModule {}
