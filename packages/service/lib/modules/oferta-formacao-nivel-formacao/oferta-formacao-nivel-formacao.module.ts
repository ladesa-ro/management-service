import { Module } from "@nestjs/common";
import { NivelFormacaoModule } from "@/modules/nivel-formacao/nivel-formacao.module";
import { OfertaFormacaoModule } from "@/modules/oferta-formacao/oferta-formacao.module";
import { OfertaFormacaoNivelFormacaoController } from "./api/oferta-formacao-nivel-formacao.controller";
import { OfertaFormacaoNivelFormacaoService } from "./domain/oferta-formacao-nivel-formacao.service";

@Module({
  imports: [OfertaFormacaoModule, NivelFormacaoModule],
  controllers: [OfertaFormacaoNivelFormacaoController],
  providers: [OfertaFormacaoNivelFormacaoService],
  exports: [OfertaFormacaoNivelFormacaoService],
})
export class OfertaFormacaoNivelFormacaoModule {}
