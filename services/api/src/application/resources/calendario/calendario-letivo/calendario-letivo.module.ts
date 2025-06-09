import { OfertaFormacaoModule } from "@/application/resources/ensino/institucional/oferta-formacao/oferta-formacao.module";
import { Module } from "@nestjs/common";
import { CampusModule } from "../../ambientes/campus/campus.module";
import { CalendarioLetivoController } from "./calendario-letivo.controller";
import { CalendarioLetivoResolver } from "./calendario-letivo.resolver";
import { CalendarioLetivoService } from "./calendario-letivo.service";

@Module({
  imports: [CampusModule, OfertaFormacaoModule],
  providers: [CalendarioLetivoService, CalendarioLetivoResolver],
  exports: [CalendarioLetivoService],
  controllers: [CalendarioLetivoController],
})
export class CalendarioLetivoModule {}
