import { Module } from "@nestjs/common";
import {
  CalendarioLetivoModule
} from "@/legacy/application/resources/calendario/calendario-letivo/calendario-letivo.module";
import { HorarioGeradoController } from "./api/horario-gerado.controller";
import { HorarioGeradoResolver } from "./horario-gerado.resolver";
import { HorarioGeradoService } from "./domain/horario-gerado.service";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [HorarioGeradoService, HorarioGeradoResolver],
  controllers: [HorarioGeradoController],
  exports: [HorarioGeradoService],
})
export class HorarioGeradoModule {
}
