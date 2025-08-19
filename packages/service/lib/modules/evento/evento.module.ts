import { Module } from "@nestjs/common";
import { CalendarioLetivoModule } from "../calendario-letivo/calendario-letivo.module";
import { EventoController } from "./api/evento.controller";
import { EventoResolver } from "./evento.resolver";
import { EventoService } from "./domain/evento.service";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [EventoService, EventoResolver],
  controllers: [EventoController],
})
export class EventoModule {
}
