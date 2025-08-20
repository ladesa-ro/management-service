import { Module } from "@nestjs/common";
import { CalendarioLetivoModule } from "../calendario-letivo/calendario-letivo.module";
import { EventoController } from "./api/evento.controller";
import { EventoService } from "./domain/evento.service";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [EventoService],
  controllers: [EventoController],
})
export class EventoModule {}
