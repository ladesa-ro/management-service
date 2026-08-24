import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { CalendarioAgendamentoModule } from "@/modules/calendario/agendamento/calendario-agendamento.module";
import { HorarioEdicaoModule } from "@/modules/calendario/horario-edicao/horario-edicao.module";
import { CalendarioSolicitacaoMudancaPermissionCheckerImpl } from "./application/authorization";
import {
  CalendarioSolicitacaoMudancaAprovarCommandHandlerImpl,
  CalendarioSolicitacaoMudancaCreateCommandHandlerImpl,
  CalendarioSolicitacaoMudancaRecusarCommandHandlerImpl,
} from "./application/commands";
import {
  CalendarioSolicitacaoMudancaFindOneQueryHandlerImpl,
  CalendarioSolicitacaoMudancaListQueryHandlerImpl,
} from "./application/queries";
import { ICalendarioSolicitacaoMudancaPermissionChecker } from "./domain/authorization";
import { ICalendarioSolicitacaoMudancaAprovarCommandHandler } from "./domain/commands/calendario-solicitacao-mudanca-aprovar.command.handler.interface";
import { ICalendarioSolicitacaoMudancaCreateCommandHandler } from "./domain/commands/calendario-solicitacao-mudanca-create.command.handler.interface";
import { ICalendarioSolicitacaoMudancaRecusarCommandHandler } from "./domain/commands/calendario-solicitacao-mudanca-recusar.command.handler.interface";
import { ICalendarioSolicitacaoMudancaFindOneQueryHandler } from "./domain/queries/calendario-solicitacao-mudanca-find-one.query.handler.interface";
import { ICalendarioSolicitacaoMudancaListQueryHandler } from "./domain/queries/calendario-solicitacao-mudanca-list.query.handler.interface";
import { ICalendarioSolicitacaoMudancaRepository } from "./domain/repositories";
import { CalendarioSolicitacaoMudancaTypeOrmRepositoryAdapter } from "./infrastructure.database/calendario-solicitacao-mudanca.repository";
import { CalendarioSolicitacaoMudancaRestController } from "./presentation.rest/calendario-solicitacao-mudanca.rest.controller";

@Module({
  imports: [HorarioEdicaoModule, CalendarioAgendamentoModule],
  controllers: [CalendarioSolicitacaoMudancaRestController],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: ICalendarioSolicitacaoMudancaPermissionChecker,
      useClass: CalendarioSolicitacaoMudancaPermissionCheckerImpl,
    },
    {
      provide: ICalendarioSolicitacaoMudancaRepository,
      useClass: CalendarioSolicitacaoMudancaTypeOrmRepositoryAdapter,
    },
    {
      provide: ICalendarioSolicitacaoMudancaCreateCommandHandler,
      useClass: CalendarioSolicitacaoMudancaCreateCommandHandlerImpl,
    },
    {
      provide: ICalendarioSolicitacaoMudancaAprovarCommandHandler,
      useClass: CalendarioSolicitacaoMudancaAprovarCommandHandlerImpl,
    },
    {
      provide: ICalendarioSolicitacaoMudancaRecusarCommandHandler,
      useClass: CalendarioSolicitacaoMudancaRecusarCommandHandlerImpl,
    },
    {
      provide: ICalendarioSolicitacaoMudancaFindOneQueryHandler,
      useClass: CalendarioSolicitacaoMudancaFindOneQueryHandlerImpl,
    },
    {
      provide: ICalendarioSolicitacaoMudancaListQueryHandler,
      useClass: CalendarioSolicitacaoMudancaListQueryHandlerImpl,
    },
  ],
})
export class CalendarioSolicitacaoMudancaModule {}
