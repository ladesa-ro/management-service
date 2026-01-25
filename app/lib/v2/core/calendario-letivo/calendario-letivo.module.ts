import { Module } from "@nestjs/common";
import { CampusModule } from "@/v2/core/campus/campus.module";
import { OfertaFormacaoModule } from "@/v2/core/oferta-formacao/oferta-formacao.module";
import { CalendarioLetivoController } from "@/v2/adapters/in/http/calendario-letivo/calendario-letivo.controller";
import { CalendarioLetivoService } from "@/v2/core/calendario-letivo/application/use-cases/calendario-letivo.service";

@Module({
  imports: [CampusModule, OfertaFormacaoModule],
  providers: [CalendarioLetivoService],
  exports: [CalendarioLetivoService],
  controllers: [CalendarioLetivoController],
})
export class CalendarioLetivoModule {}
