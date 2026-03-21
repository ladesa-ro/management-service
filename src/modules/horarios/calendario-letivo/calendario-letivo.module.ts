import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { CampusModule } from "@/modules/ambientes/campus/campus.module";
import { OfertaFormacaoModule } from "@/modules/ensino/oferta-formacao/oferta-formacao.module";
import { ICalendarioLetivoRepository } from "@/modules/horarios/calendario-letivo";
import { CalendarioLetivoPermissionCheckerImpl } from "@/modules/horarios/calendario-letivo/application/authorization";
import {
  CalendarioLetivoCreateCommandHandlerImpl,
  CalendarioLetivoDeleteCommandHandlerImpl,
  CalendarioLetivoDiaUpdateCommandHandlerImpl,
  CalendarioLetivoUpdateCommandHandlerImpl,
} from "@/modules/horarios/calendario-letivo/application/commands";
import {
  CalendarioLetivoDiaFindOneQueryHandlerImpl,
  CalendarioLetivoDiaListQueryHandlerImpl,
  CalendarioLetivoFindOneQueryHandlerImpl,
  CalendarioLetivoListQueryHandlerImpl,
} from "@/modules/horarios/calendario-letivo/application/queries";
import { ICalendarioLetivoPermissionChecker } from "@/modules/horarios/calendario-letivo/domain/authorization";
import {
  ICalendarioLetivoCreateCommandHandler,
  ICalendarioLetivoDeleteCommandHandler,
  ICalendarioLetivoDiaUpdateCommandHandler,
  ICalendarioLetivoUpdateCommandHandler,
} from "@/modules/horarios/calendario-letivo/domain/commands";
import {
  ICalendarioLetivoDiaFindOneQueryHandler,
  ICalendarioLetivoDiaListQueryHandler,
  ICalendarioLetivoFindOneQueryHandler,
  ICalendarioLetivoListQueryHandler,
} from "@/modules/horarios/calendario-letivo/domain/queries";
import {
  ICalendarioLetivoDiaRepository,
  ICalendarioLetivoEtapaRepository,
} from "@/modules/horarios/calendario-letivo/domain/repositories";
import {
  CalendarioLetivoDiaTypeOrmRepositoryAdapter,
  CalendarioLetivoEtapaTypeOrmRepositoryAdapter,
  CalendarioLetivoTypeOrmRepositoryAdapter,
} from "@/modules/horarios/calendario-letivo/infrastructure.database";
import { CalendarioLetivoGraphqlResolver } from "@/modules/horarios/calendario-letivo/presentation.graphql/calendario-letivo.graphql.resolver";
import { CalendarioLetivoRestController } from "@/modules/horarios/calendario-letivo/presentation.rest/calendario-letivo.rest.controller";
import { CalendarioLetivoDiaRestController } from "@/modules/horarios/calendario-letivo/presentation.rest/calendario-letivo-dia.rest.controller";
import {
  CalendarioLetivoDesativarRestController,
  CalendarioLetivoEtapaRestController,
} from "@/modules/horarios/calendario-letivo/presentation.rest/calendario-letivo-etapa.rest.controller";

@Module({
  imports: [CampusModule, OfertaFormacaoModule],
  controllers: [
    CalendarioLetivoRestController,
    CalendarioLetivoDiaRestController,
    CalendarioLetivoEtapaRestController,
    CalendarioLetivoDesativarRestController,
  ],
  providers: [
    NestJsPaginateAdapter,
    CalendarioLetivoGraphqlResolver,
    {
      provide: ICalendarioLetivoPermissionChecker,
      useClass: CalendarioLetivoPermissionCheckerImpl,
    },
    {
      provide: ICalendarioLetivoRepository,
      useClass: CalendarioLetivoTypeOrmRepositoryAdapter,
    },
    {
      provide: ICalendarioLetivoDiaRepository,
      useClass: CalendarioLetivoDiaTypeOrmRepositoryAdapter,
    },
    {
      provide: ICalendarioLetivoEtapaRepository,
      useClass: CalendarioLetivoEtapaTypeOrmRepositoryAdapter,
    },

    // Calendario Letivo Commands
    {
      provide: ICalendarioLetivoCreateCommandHandler,
      useClass: CalendarioLetivoCreateCommandHandlerImpl,
    },
    {
      provide: ICalendarioLetivoUpdateCommandHandler,
      useClass: CalendarioLetivoUpdateCommandHandlerImpl,
    },
    {
      provide: ICalendarioLetivoDeleteCommandHandler,
      useClass: CalendarioLetivoDeleteCommandHandlerImpl,
    },
    // Calendario Letivo Queries
    { provide: ICalendarioLetivoListQueryHandler, useClass: CalendarioLetivoListQueryHandlerImpl },
    {
      provide: ICalendarioLetivoFindOneQueryHandler,
      useClass: CalendarioLetivoFindOneQueryHandlerImpl,
    },

    // Calendario Letivo Dia Commands
    {
      provide: ICalendarioLetivoDiaUpdateCommandHandler,
      useClass: CalendarioLetivoDiaUpdateCommandHandlerImpl,
    },
    // Calendario Letivo Dia Queries
    {
      provide: ICalendarioLetivoDiaListQueryHandler,
      useClass: CalendarioLetivoDiaListQueryHandlerImpl,
    },
    {
      provide: ICalendarioLetivoDiaFindOneQueryHandler,
      useClass: CalendarioLetivoDiaFindOneQueryHandlerImpl,
    },
  ],
  exports: [ICalendarioLetivoFindOneQueryHandler],
})
export class CalendarioLetivoModule {}
