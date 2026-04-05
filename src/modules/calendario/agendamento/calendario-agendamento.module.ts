import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import {
  CalendarioAgendamentoCreateCommandHandlerImpl,
  CalendarioAgendamentoDeleteCommandHandlerImpl,
  CalendarioAgendamentoDesvincularPerfilCommandHandlerImpl,
  CalendarioAgendamentoDesvincularTurmaCommandHandlerImpl,
  CalendarioAgendamentoUpdateCommandHandlerImpl,
  CalendarioAgendamentoUpdateStatusCommandHandlerImpl,
} from "./application/commands";
import {
  CalendarioAgendamentoFindOneQueryHandlerImpl,
  CalendarioAgendamentoListQueryHandlerImpl,
} from "./application/queries";
import { ICalendarioAgendamentoCreateCommandHandler } from "./domain/commands/calendario-agendamento-create.command.handler.interface";
import { ICalendarioAgendamentoDeleteCommandHandler } from "./domain/commands/calendario-agendamento-delete.command.handler.interface";
import { ICalendarioAgendamentoDesvincularPerfilCommandHandler } from "./domain/commands/calendario-agendamento-desvincular-perfil.command.handler.interface";
import { ICalendarioAgendamentoDesvincularTurmaCommandHandler } from "./domain/commands/calendario-agendamento-desvincular-turma.command.handler.interface";
import { ICalendarioAgendamentoUpdateCommandHandler } from "./domain/commands/calendario-agendamento-update.command.handler.interface";
import { ICalendarioAgendamentoUpdateStatusCommandHandler } from "./domain/commands/calendario-agendamento-update-status.command.handler.interface";
import { ICalendarioAgendamentoFindOneQueryHandler } from "./domain/queries/calendario-agendamento-find-one.query.handler.interface";
import { ICalendarioAgendamentoListQueryHandler } from "./domain/queries/calendario-agendamento-list.query.handler.interface";
import { ICalendarioAgendamentoRepository } from "./domain/repositories/calendario-agendamento.repository.interface";
import { CalendarioAgendamentoTypeOrmRepositoryAdapter } from "./infrastructure.database/calendario-agendamento.repository";
import { CalendarioAgendamentoRestController } from "./presentation.rest/calendario-agendamento.rest.controller";

@Module({
  controllers: [CalendarioAgendamentoRestController],
  providers: [
    NestJsPaginateAdapter,
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
      provide: ICalendarioAgendamentoDesvincularTurmaCommandHandler,
      useClass: CalendarioAgendamentoDesvincularTurmaCommandHandlerImpl,
    },
    {
      provide: ICalendarioAgendamentoDesvincularPerfilCommandHandler,
      useClass: CalendarioAgendamentoDesvincularPerfilCommandHandlerImpl,
    },
    {
      provide: ICalendarioAgendamentoUpdateStatusCommandHandler,
      useClass: CalendarioAgendamentoUpdateStatusCommandHandlerImpl,
    },
    {
      provide: ICalendarioAgendamentoFindOneQueryHandler,
      useClass: CalendarioAgendamentoFindOneQueryHandlerImpl,
    },
    {
      provide: ICalendarioAgendamentoListQueryHandler,
      useClass: CalendarioAgendamentoListQueryHandlerImpl,
    },
  ],
  exports: [ICalendarioAgendamentoRepository],
})
export class CalendarioAgendamentoModule {}
