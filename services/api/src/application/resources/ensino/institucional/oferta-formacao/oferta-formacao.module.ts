import { ModalidadeModule } from "@/application/resources/ensino/institucional/modalidade/modalidade.module";
import { Module } from "@nestjs/common";
import { OfertaFormacaoController } from "./oferta-formacao.controller";
import { OfertaFormacaoResolver } from "./oferta-formacao.resolver";
import { OfertaFormacaoService } from "./oferta-formacao.service";

@Module({
  imports: [ModalidadeModule],
  controllers: [OfertaFormacaoController],
  providers: [OfertaFormacaoService, OfertaFormacaoResolver],
  exports: [OfertaFormacaoService],
})
export class OfertaFormacaoModule {}
