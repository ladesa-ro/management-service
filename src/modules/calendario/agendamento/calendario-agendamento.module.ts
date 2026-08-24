import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { UsuarioModule } from "@/modules/acesso/usuario/usuario.module";
import { AmbienteModule } from "@/modules/ambientes/ambiente/ambiente.module";
import { CalendarioColecaoModule } from "@/modules/calendario/colecao/calendario-colecao.module";
import { TurmaModule } from "@/modules/ensino/turma/turma.module";
import {
  CalendarioAgendamentoPermissionCheckerImpl,
  CalendarioAgendamentoVisibilidadeService,
} from "./application/authorization";
import { CalendarioAgendamentoConflitoService } from "./application/calendario-agendamento-conflito.service";
import {
  CalendarioAgendamentoAdicionarDataAvulsaCommandHandlerImpl,
  CalendarioAgendamentoCancelarOcorrenciaCommandHandlerImpl,
  CalendarioAgendamentoCreateCommandHandlerImpl,
  CalendarioAgendamentoDeleteCommandHandlerImpl,
  CalendarioAgendamentoDesvincularTurmaCommandHandlerImpl,
  CalendarioAgendamentoEditarOcorrenciaCommandHandlerImpl,
  CalendarioAgendamentoEditarSerieCommandHandlerImpl,
  CalendarioAgendamentoImportarIcsCommandHandlerImpl,
  CalendarioAgendamentoUpdateCommandHandlerImpl,
  CalendarioAgendamentoUpdateStatusCommandHandlerImpl,
} from "./application/commands";
import {
  CalendarioAgendamentoFindOneQueryHandlerImpl,
  CalendarioAgendamentoLinhaDoTempoQueryHandlerImpl,
  CalendarioAgendamentoListQueryHandlerImpl,
} from "./application/queries";
import { ICalendarioAgendamentoPermissionChecker } from "./domain/authorization";
import { ICalendarioAgendamentoAdicionarDataAvulsaCommandHandler } from "./domain/commands/calendario-agendamento-adicionar-data-avulsa.command.handler.interface";
import { ICalendarioAgendamentoCancelarOcorrenciaCommandHandler } from "./domain/commands/calendario-agendamento-cancelar-ocorrencia.command.handler.interface";
import { ICalendarioAgendamentoCreateCommandHandler } from "./domain/commands/calendario-agendamento-create.command.handler.interface";
import { ICalendarioAgendamentoDeleteCommandHandler } from "./domain/commands/calendario-agendamento-delete.command.handler.interface";
import { ICalendarioAgendamentoDesvincularTurmaCommandHandler } from "./domain/commands/calendario-agendamento-desvincular-turma.command.handler.interface";
import { ICalendarioAgendamentoEditarOcorrenciaCommandHandler } from "./domain/commands/calendario-agendamento-editar-ocorrencia.command.handler.interface";
import { ICalendarioAgendamentoEditarSerieCommandHandler } from "./domain/commands/calendario-agendamento-editar-serie.command.handler.interface";
import { ICalendarioAgendamentoImportarIcsCommandHandler } from "./domain/commands/calendario-agendamento-importar-ics.command.handler.interface";
import { ICalendarioAgendamentoUpdateCommandHandler } from "./domain/commands/calendario-agendamento-update.command.handler.interface";
import { ICalendarioAgendamentoUpdateStatusCommandHandler } from "./domain/commands/calendario-agendamento-update-status.command.handler.interface";
import { ICalendarioAgendamentoFindOneQueryHandler } from "./domain/queries/calendario-agendamento-find-one.query.handler.interface";
import { ICalendarioAgendamentoLinhaDoTempoQueryHandler } from "./domain/queries/calendario-agendamento-linha-do-tempo.query.handler.interface";
import { ICalendarioAgendamentoListQueryHandler } from "./domain/queries/calendario-agendamento-list.query.handler.interface";
import { ICalendarioAgendamentoRepository } from "./domain/repositories/calendario-agendamento.repository.interface";
import { CalendarioAgendamentoTypeOrmRepositoryAdapter } from "./infrastructure.database/calendario-agendamento.repository";
import { CalendarioAgendamentoRestController } from "./presentation.rest/calendario-agendamento.rest.controller";

@Module({
  imports: [CalendarioColecaoModule, TurmaModule, AmbienteModule, UsuarioModule],
  controllers: [CalendarioAgendamentoRestController],
  providers: [
    NestJsPaginateAdapter,
    CalendarioAgendamentoVisibilidadeService,
    CalendarioAgendamentoConflitoService,
    {
      provide: ICalendarioAgendamentoPermissionChecker,
      useClass: CalendarioAgendamentoPermissionCheckerImpl,
    },
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
      provide: ICalendarioAgendamentoUpdateStatusCommandHandler,
      useClass: CalendarioAgendamentoUpdateStatusCommandHandlerImpl,
    },
    {
      provide: ICalendarioAgendamentoEditarOcorrenciaCommandHandler,
      useClass: CalendarioAgendamentoEditarOcorrenciaCommandHandlerImpl,
    },
    {
      provide: ICalendarioAgendamentoCancelarOcorrenciaCommandHandler,
      useClass: CalendarioAgendamentoCancelarOcorrenciaCommandHandlerImpl,
    },
    {
      provide: ICalendarioAgendamentoAdicionarDataAvulsaCommandHandler,
      useClass: CalendarioAgendamentoAdicionarDataAvulsaCommandHandlerImpl,
    },
    {
      provide: ICalendarioAgendamentoEditarSerieCommandHandler,
      useClass: CalendarioAgendamentoEditarSerieCommandHandlerImpl,
    },
    {
      provide: ICalendarioAgendamentoImportarIcsCommandHandler,
      useClass: CalendarioAgendamentoImportarIcsCommandHandlerImpl,
    },
    {
      provide: ICalendarioAgendamentoFindOneQueryHandler,
      useClass: CalendarioAgendamentoFindOneQueryHandlerImpl,
    },
    {
      provide: ICalendarioAgendamentoListQueryHandler,
      useClass: CalendarioAgendamentoListQueryHandlerImpl,
    },
    {
      provide: ICalendarioAgendamentoLinhaDoTempoQueryHandler,
      useClass: CalendarioAgendamentoLinhaDoTempoQueryHandlerImpl,
    },
  ],
  exports: [
    ICalendarioAgendamentoRepository,
    ICalendarioAgendamentoListQueryHandler,
    CalendarioAgendamentoVisibilidadeService,
  ],
})
export class CalendarioAgendamentoModule {}
