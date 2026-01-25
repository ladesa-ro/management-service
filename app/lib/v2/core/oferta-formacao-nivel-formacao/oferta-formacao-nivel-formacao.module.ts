import { Module } from "@nestjs/common";
import { OfertaFormacaoNivelFormacaoController } from "@/v2/adapters/in/http/oferta-formacao-nivel-formacao/oferta-formacao-nivel-formacao.controller";
import { NivelFormacaoModule } from "@/v2/core/nivel-formacao/nivel-formacao.module";
import { OfertaFormacaoModule } from "@/v2/core/oferta-formacao/oferta-formacao.module";
import { OfertaFormacaoNivelFormacaoService } from "@/v2/core/oferta-formacao-nivel-formacao/application/use-cases/oferta-formacao-nivel-formacao.service";

@Module({
  imports: [OfertaFormacaoModule, NivelFormacaoModule],
  controllers: [OfertaFormacaoNivelFormacaoController],
  providers: [OfertaFormacaoNivelFormacaoService],
  exports: [OfertaFormacaoNivelFormacaoService],
})
export class OfertaFormacaoNivelFormacaoModule {}
