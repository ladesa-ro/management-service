import { Module } from "@nestjs/common";
import { CalendarioLetivoModule } from "../calendario-letivo/calendario-letivo.module";
import { EventoController } from "@/v2/adapters/in/http/evento/evento.controller";
import { EventoService } from "@/v2/core/evento/application/use-cases/evento.service";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [EventoService],
  controllers: [EventoController],
})
export class EventoModule {}
