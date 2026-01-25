import { Module } from "@nestjs/common";
import { OfertaFormacaoNivelFormacaoService } from "@/v2/core/oferta-formacao-nivel-formacao/application/use-cases/oferta-formacao-nivel-formacao.service";
import { NivelFormacaoModule } from "@/v2/server/modules/nivel-formacao";
import { OfertaFormacaoModule } from "@/v2/server/modules/oferta-formacao";
import { OfertaFormacaoNivelFormacaoController } from "./controllers";

@Module({
  imports: [OfertaFormacaoModule, NivelFormacaoModule],
  controllers: [OfertaFormacaoNivelFormacaoController],
  providers: [OfertaFormacaoNivelFormacaoService],
  exports: [OfertaFormacaoNivelFormacaoService],
})
export class OfertaFormacaoNivelFormacaoModule {}
