import { NivelFormacaoModule } from "@/domain/resources/ensino/institucional/nivel-formacao/nivel-formacao.module";
import { OfertaFormacaoModule } from "@/domain/resources/ensino/institucional/oferta-formacao/oferta-formacao.module";
import { Module } from "@nestjs/common";
import { OfertaFormacaoNivelFormacaoController } from "./oferta-formacao-nivel-formacao.controller";
import { OfertaFormacaoNivelFormacaoService } from "./oferta-formacao-nivel-formacao.service";

@Module({
  imports: [OfertaFormacaoModule, NivelFormacaoModule],
  controllers: [OfertaFormacaoNivelFormacaoController],
  providers: [OfertaFormacaoNivelFormacaoService],
  exports: [OfertaFormacaoNivelFormacaoService],
})
export class OfertaFormacaoNivelFormacaoModule {}
