import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { CalendarioIndisponibilidadeProfessorPermissionCheckerImpl } from "./application/authorization";
import {
  CalendarioIndisponibilidadeProfessorCreateCommandHandlerImpl,
  CalendarioIndisponibilidadeProfessorDeleteCommandHandlerImpl,
} from "./application/commands";
import {
  CalendarioIndisponibilidadeProfessorFindOneQueryHandlerImpl,
  CalendarioIndisponibilidadeProfessorListQueryHandlerImpl,
  CalendarioIndisponibilidadeProfessorPorPeriodoQueryHandlerImpl,
} from "./application/queries";
import { ICalendarioIndisponibilidadeProfessorPermissionChecker } from "./domain/authorization";
import { ICalendarioIndisponibilidadeProfessorCreateCommandHandler } from "./domain/commands/calendario-indisponibilidade-professor-create.command.handler.interface";
import { ICalendarioIndisponibilidadeProfessorDeleteCommandHandler } from "./domain/commands/calendario-indisponibilidade-professor-delete.command.handler.interface";
import { ICalendarioIndisponibilidadeProfessorFindOneQueryHandler } from "./domain/queries/calendario-indisponibilidade-professor-find-one.query.handler.interface";
import { ICalendarioIndisponibilidadeProfessorListQueryHandler } from "./domain/queries/calendario-indisponibilidade-professor-list.query.handler.interface";
import { ICalendarioIndisponibilidadeProfessorPorPeriodoQueryHandler } from "./domain/queries/calendario-indisponibilidade-professor-por-periodo.query.handler.interface";
import { ICalendarioIndisponibilidadeProfessorRepository } from "./domain/repositories";
import { CalendarioIndisponibilidadeProfessorTypeOrmRepositoryAdapter } from "./infrastructure.database/calendario-indisponibilidade-professor.repository";
import { CalendarioIndisponibilidadeProfessorRestController } from "./presentation.rest/calendario-indisponibilidade-professor.rest.controller";

@Module({
  controllers: [CalendarioIndisponibilidadeProfessorRestController],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: ICalendarioIndisponibilidadeProfessorPermissionChecker,
      useClass: CalendarioIndisponibilidadeProfessorPermissionCheckerImpl,
    },
    {
      provide: ICalendarioIndisponibilidadeProfessorRepository,
      useClass: CalendarioIndisponibilidadeProfessorTypeOrmRepositoryAdapter,
    },
    {
      provide: ICalendarioIndisponibilidadeProfessorCreateCommandHandler,
      useClass: CalendarioIndisponibilidadeProfessorCreateCommandHandlerImpl,
    },
    {
      provide: ICalendarioIndisponibilidadeProfessorDeleteCommandHandler,
      useClass: CalendarioIndisponibilidadeProfessorDeleteCommandHandlerImpl,
    },
    {
      provide: ICalendarioIndisponibilidadeProfessorFindOneQueryHandler,
      useClass: CalendarioIndisponibilidadeProfessorFindOneQueryHandlerImpl,
    },
    {
      provide: ICalendarioIndisponibilidadeProfessorListQueryHandler,
      useClass: CalendarioIndisponibilidadeProfessorListQueryHandlerImpl,
    },
    {
      provide: ICalendarioIndisponibilidadeProfessorPorPeriodoQueryHandler,
      useClass: CalendarioIndisponibilidadeProfessorPorPeriodoQueryHandlerImpl,
    },
  ],
  exports: [
    ICalendarioIndisponibilidadeProfessorRepository,
    ICalendarioIndisponibilidadeProfessorFindOneQueryHandler,
  ],
})
export class CalendarioIndisponibilidadeProfessorModule {}
