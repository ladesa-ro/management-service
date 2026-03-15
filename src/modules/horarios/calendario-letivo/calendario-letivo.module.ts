import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { CampusModule } from "@/modules/ambientes/campus/campus.module";
import { OfertaFormacaoModule } from "@/modules/ensino/oferta-formacao/oferta-formacao.module";
import { ICalendarioLetivoRepository } from "@/modules/horarios/calendario-letivo";
import { CalendarioLetivoPermissionCheckerImpl } from "@/modules/horarios/calendario-letivo/application/authorization";
import {
  CalendarioLetivoCreateCommandHandlerImpl,
  CalendarioLetivoDeleteCommandHandlerImpl,
  CalendarioLetivoUpdateCommandHandlerImpl,
} from "@/modules/horarios/calendario-letivo/application/commands";
import {
  CalendarioLetivoFindOneQueryHandlerImpl,
  CalendarioLetivoListQueryHandlerImpl,
} from "@/modules/horarios/calendario-letivo/application/queries";
import { ICalendarioLetivoPermissionChecker } from "@/modules/horarios/calendario-letivo/domain/authorization";
import {
  ICalendarioLetivoCreateCommandHandler,
  ICalendarioLetivoDeleteCommandHandler,
  ICalendarioLetivoUpdateCommandHandler,
} from "@/modules/horarios/calendario-letivo/domain/commands";
import {
  ICalendarioLetivoFindOneQueryHandler,
  ICalendarioLetivoListQueryHandler,
} from "@/modules/horarios/calendario-letivo/domain/queries";
import { CalendarioLetivoTypeOrmRepositoryAdapter } from "@/modules/horarios/calendario-letivo/infrastructure.database";
import { CalendarioLetivoGraphqlResolver } from "@/modules/horarios/calendario-letivo/presentation/graphql/calendario-letivo.graphql.resolver";
import { CalendarioLetivoRestController } from "@/modules/horarios/calendario-letivo/presentation/rest/calendario-letivo.rest.controller";

@Module({
  imports: [CampusModule, OfertaFormacaoModule],
  controllers: [CalendarioLetivoRestController],
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

    // Commands
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
    // Queries
    { provide: ICalendarioLetivoListQueryHandler, useClass: CalendarioLetivoListQueryHandlerImpl },
    {
      provide: ICalendarioLetivoFindOneQueryHandler,
      useClass: CalendarioLetivoFindOneQueryHandlerImpl,
    },
  ],
  exports: [ICalendarioLetivoFindOneQueryHandler],
})
export class CalendarioLetivoModule {}
