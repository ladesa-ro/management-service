import { Module } from "@nestjs/common";
import { EventoService } from "@/v2/core/evento/application/use-cases/evento.service";
import { CalendarioLetivoModule } from "@/server/nest/modules/calendario-letivo";
import { EventoController } from "./http";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [EventoService],
  controllers: [EventoController],
  exports: [EventoService],
})
export class EventoModule {}
