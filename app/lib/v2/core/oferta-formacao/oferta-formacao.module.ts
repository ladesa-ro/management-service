import { Module } from "@nestjs/common";
import { ModalidadeModule } from "@/v2/core/modalidade/modalidade.module";
import { OfertaFormacaoController } from "./api/oferta-formacao.controller";
import { OfertaFormacaoService } from "./domain/oferta-formacao.service";

@Module({
  imports: [ModalidadeModule],
  controllers: [OfertaFormacaoController],
  providers: [OfertaFormacaoService],
  exports: [OfertaFormacaoService],
})
export class OfertaFormacaoModule {}
