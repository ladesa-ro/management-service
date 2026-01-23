import { Module } from "@nestjs/common";
import { NivelFormacaoModule } from "@/features/nivel-formacao/nivel-formacao.module";
import { OfertaFormacaoModule } from "@/features/oferta-formacao/oferta-formacao.module";
import { OfertaFormacaoNivelFormacaoController } from "./api/oferta-formacao-nivel-formacao.controller";
import { OfertaFormacaoNivelFormacaoService } from "./domain/oferta-formacao-nivel-formacao.service";

@Module({
  imports: [OfertaFormacaoModule, NivelFormacaoModule],
  controllers: [OfertaFormacaoNivelFormacaoController],
  providers: [OfertaFormacaoNivelFormacaoService],
  exports: [OfertaFormacaoNivelFormacaoService],
})
export class OfertaFormacaoNivelFormacaoModule {}
