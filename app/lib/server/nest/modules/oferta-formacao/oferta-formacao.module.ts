import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/@shared/infrastructure/persistence/typeorm";
import { OFERTA_FORMACAO_REPOSITORY_PORT, OfertaFormacaoService } from "@/modules/oferta-formacao";
import { OfertaFormacaoTypeOrmRepositoryAdapter } from "@/modules/oferta-formacao/infrastructure/persistence/typeorm";
import { ModalidadeModule } from "@/server/nest/modules/modalidade";
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
