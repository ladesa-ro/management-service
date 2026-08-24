import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { CalendarioIndisponibilidadeAmbientePermissionCheckerImpl } from "./application/authorization";
import {
  CalendarioIndisponibilidadeAmbienteCreateCommandHandlerImpl,
  CalendarioIndisponibilidadeAmbienteDeleteCommandHandlerImpl,
} from "./application/commands";
import {
  CalendarioIndisponibilidadeAmbienteFindOneQueryHandlerImpl,
  CalendarioIndisponibilidadeAmbienteListQueryHandlerImpl,
  CalendarioIndisponibilidadeAmbientePorPeriodoQueryHandlerImpl,
} from "./application/queries";
import { ICalendarioIndisponibilidadeAmbientePermissionChecker } from "./domain/authorization";
import { ICalendarioIndisponibilidadeAmbienteCreateCommandHandler } from "./domain/commands/calendario-indisponibilidade-ambiente-create.command.handler.interface";
import { ICalendarioIndisponibilidadeAmbienteDeleteCommandHandler } from "./domain/commands/calendario-indisponibilidade-ambiente-delete.command.handler.interface";
import { ICalendarioIndisponibilidadeAmbienteFindOneQueryHandler } from "./domain/queries/calendario-indisponibilidade-ambiente-find-one.query.handler.interface";
import { ICalendarioIndisponibilidadeAmbienteListQueryHandler } from "./domain/queries/calendario-indisponibilidade-ambiente-list.query.handler.interface";
import { ICalendarioIndisponibilidadeAmbientePorPeriodoQueryHandler } from "./domain/queries/calendario-indisponibilidade-ambiente-por-periodo.query.handler.interface";
import { ICalendarioIndisponibilidadeAmbienteRepository } from "./domain/repositories";
import { CalendarioIndisponibilidadeAmbienteTypeOrmRepositoryAdapter } from "./infrastructure.database/calendario-indisponibilidade-ambiente.repository";
import { CalendarioIndisponibilidadeAmbienteRestController } from "./presentation.rest/calendario-indisponibilidade-ambiente.rest.controller";

@Module({
  controllers: [CalendarioIndisponibilidadeAmbienteRestController],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: ICalendarioIndisponibilidadeAmbientePermissionChecker,
      useClass: CalendarioIndisponibilidadeAmbientePermissionCheckerImpl,
    },
    {
      provide: ICalendarioIndisponibilidadeAmbienteRepository,
      useClass: CalendarioIndisponibilidadeAmbienteTypeOrmRepositoryAdapter,
    },
    {
      provide: ICalendarioIndisponibilidadeAmbienteCreateCommandHandler,
      useClass: CalendarioIndisponibilidadeAmbienteCreateCommandHandlerImpl,
    },
    {
      provide: ICalendarioIndisponibilidadeAmbienteDeleteCommandHandler,
      useClass: CalendarioIndisponibilidadeAmbienteDeleteCommandHandlerImpl,
    },
    {
      provide: ICalendarioIndisponibilidadeAmbienteFindOneQueryHandler,
      useClass: CalendarioIndisponibilidadeAmbienteFindOneQueryHandlerImpl,
    },
    {
      provide: ICalendarioIndisponibilidadeAmbienteListQueryHandler,
      useClass: CalendarioIndisponibilidadeAmbienteListQueryHandlerImpl,
    },
    {
      provide: ICalendarioIndisponibilidadeAmbientePorPeriodoQueryHandler,
      useClass: CalendarioIndisponibilidadeAmbientePorPeriodoQueryHandlerImpl,
    },
  ],
  exports: [
    ICalendarioIndisponibilidadeAmbienteRepository,
    ICalendarioIndisponibilidadeAmbienteFindOneQueryHandler,
  ],
})
export class CalendarioIndisponibilidadeAmbienteModule {}
