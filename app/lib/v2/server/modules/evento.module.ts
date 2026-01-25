import { Module } from "@nestjs/common";
import { EventoController } from "@/v2/adapters/in/http/evento/evento.controller";
import { EventoService } from "@/v2/core/evento/application/use-cases/evento.service";
import { CalendarioLetivoModule } from "@/v2/server/modules/calendario-letivo.module";

/**
 * Módulo Evento configurado com Arquitetura Hexagonal
 */
@Module({
  imports: [CalendarioLetivoModule],
  providers: [EventoService],
  controllers: [EventoController],
  exports: [EventoService],
})
export class EventoModule {}
