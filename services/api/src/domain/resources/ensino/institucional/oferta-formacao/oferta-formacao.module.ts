import { ModalidadeModule } from "@/domain/resources/ensino/institucional/modalidade/modalidade.module";
import { Module } from "@nestjs/common";
import { OfertaFormacaoController } from "./oferta-formacao.controller";
import { OfertaFormacaoService } from "./oferta-formacao.service";

@Module({
  imports: [ModalidadeModule],
  controllers: [OfertaFormacaoController],
  providers: [OfertaFormacaoService],
  exports: [OfertaFormacaoService],
})
export class OfertaFormacaoModule {}
