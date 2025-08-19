import { Module } from "@nestjs/common";
import {
  OfertaFormacaoModule
} from "@/legacy/application/resources/ensino/institucional/oferta-formacao/oferta-formacao.module";
import { CampusModule } from "@/modules/campus/campus.module";
import { CalendarioLetivoController } from "./api/calendario-letivo.controller";
import { CalendarioLetivoResolver } from "./calendario-letivo.resolver";
import { CalendarioLetivoService } from "./domain/calendario-letivo.service";

@Module({
  imports: [CampusModule, OfertaFormacaoModule],
  providers: [CalendarioLetivoService, CalendarioLetivoResolver],
  exports: [CalendarioLetivoService],
  controllers: [CalendarioLetivoController],
})
export class CalendarioLetivoModule {
}
