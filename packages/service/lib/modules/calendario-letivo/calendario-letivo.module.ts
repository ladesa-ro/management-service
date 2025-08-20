import { Module } from "@nestjs/common";
import { CampusModule } from "@/modules/campus/campus.module";
import { OfertaFormacaoModule } from "@/modules/oferta-formacao/oferta-formacao.module";
import { CalendarioLetivoController } from "./api/calendario-letivo.controller";
import { CalendarioLetivoService } from "./domain/calendario-letivo.service";

@Module({
  imports: [CampusModule, OfertaFormacaoModule],
  providers: [CalendarioLetivoService],
  exports: [CalendarioLetivoService],
  controllers: [CalendarioLetivoController],
})
export class CalendarioLetivoModule {}
