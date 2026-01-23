import { Module } from "@nestjs/common";
import { NivelFormacaoModule } from "@/v2/core/nivel-formacao/nivel-formacao.module";
import { OfertaFormacaoModule } from "@/v2/core/oferta-formacao/oferta-formacao.module";
import { OfertaFormacaoNivelFormacaoController } from "./api/oferta-formacao-nivel-formacao.controller";
import { OfertaFormacaoNivelFormacaoService } from "./domain/oferta-formacao-nivel-formacao.service";

@Module({
  imports: [OfertaFormacaoModule, NivelFormacaoModule],
  controllers: [OfertaFormacaoNivelFormacaoController],
  providers: [OfertaFormacaoNivelFormacaoService],
  exports: [OfertaFormacaoNivelFormacaoService],
})
export class OfertaFormacaoNivelFormacaoModule {}
