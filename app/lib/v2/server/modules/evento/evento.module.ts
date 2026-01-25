import { Module } from "@nestjs/common";
import { EventoService } from "@/v2/core/evento/application/use-cases/evento.service";
import { CalendarioLetivoModule } from "@/v2/server/modules/calendario-letivo";
import { EventoController } from "./controllers";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [EventoService],
  controllers: [EventoController],
  exports: [EventoService],
})
export class EventoModule {}
