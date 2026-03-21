import { Module } from "@nestjs/common";
import { ICalendarioAgendamentoRepository } from "./domain/repositories/calendario-agendamento.repository.interface";
import { ICalendarioAgendamentoJunctionRepository } from "./domain/repositories/calendario-agendamento-junction.repository.interface";
import { CalendarioAgendamentoTypeOrmRepositoryAdapter } from "./infrastructure.database/calendario-agendamento.repository";
import { CalendarioEventoRestController } from "./presentation.rest/calendario-evento.rest.controller";

@Module({
  controllers: [CalendarioEventoRestController],
  providers: [
    {
      provide: ICalendarioAgendamentoRepository,
      useClass: CalendarioAgendamentoTypeOrmRepositoryAdapter,
    },
    {
      provide: ICalendarioAgendamentoJunctionRepository,
      useClass: CalendarioAgendamentoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [ICalendarioAgendamentoRepository],
})
export class CalendarioAgendamentoModule {}
