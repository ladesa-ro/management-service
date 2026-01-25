import { Module } from "@nestjs/common";
import { ModalidadeModule } from "@/v2/core/modalidade/modalidade.module";
import { OfertaFormacaoController } from "@/v2/adapters/in/http/oferta-formacao/oferta-formacao.controller";
import { OfertaFormacaoService } from "@/v2/core/oferta-formacao/application/use-cases/oferta-formacao.service";

@Module({
  imports: [ModalidadeModule],
  controllers: [OfertaFormacaoController],
  providers: [OfertaFormacaoService],
  exports: [OfertaFormacaoService],
})
export class OfertaFormacaoModule {}
