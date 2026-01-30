import { Module } from "@nestjs/common";
import { EventoService } from "@/core/evento";
import { CalendarioLetivoModule } from "@/server/nest/modules/calendario-letivo";
import { EventoRestController } from "./rest";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [EventoService],
  controllers: [EventoRestController],
  exports: [EventoService],
})
export class EventoModule {}
