import { Module } from "@nestjs/common";
import {
  CalendarioAgendamentoCreateCommandHandlerImpl,
  CalendarioAgendamentoDeleteCommandHandlerImpl,
  CalendarioAgendamentoUpdateCommandHandlerImpl,
} from "./application/commands";
import { CalendarioAgendamentoFindOneQueryHandlerImpl } from "./application/queries";
import { ICalendarioAgendamentoCreateCommandHandler } from "./domain/commands/calendario-agendamento-create.command.handler.interface";
import { ICalendarioAgendamentoDeleteCommandHandler } from "./domain/commands/calendario-agendamento-delete.command.handler.interface";
import { ICalendarioAgendamentoUpdateCommandHandler } from "./domain/commands/calendario-agendamento-update.command.handler.interface";
import { ICalendarioAgendamentoFindOneQueryHandler } from "./domain/queries/calendario-agendamento-find-one.query.handler.interface";
import { ICalendarioAgendamentoRepository } from "./domain/repositories/calendario-agendamento.repository.interface";
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
      provide: ICalendarioAgendamentoCreateCommandHandler,
      useClass: CalendarioAgendamentoCreateCommandHandlerImpl,
    },
    {
      provide: ICalendarioAgendamentoUpdateCommandHandler,
      useClass: CalendarioAgendamentoUpdateCommandHandlerImpl,
    },
    {
      provide: ICalendarioAgendamentoDeleteCommandHandler,
      useClass: CalendarioAgendamentoDeleteCommandHandlerImpl,
    },
    {
      provide: ICalendarioAgendamentoFindOneQueryHandler,
      useClass: CalendarioAgendamentoFindOneQueryHandlerImpl,
    },
  ],
  exports: [ICalendarioAgendamentoRepository],
})
export class CalendarioAgendamentoModule {}
