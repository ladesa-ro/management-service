import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { CalendarioLetivoModule } from "@/modules/horarios/calendario-letivo/calendario-letivo.module";
import { DiaCalendarioPermissionCheckerImpl } from "@/modules/horarios/dia-calendario/application/authorization";
import {
  DiaCalendarioCreateCommandHandlerImpl,
  DiaCalendarioDeleteCommandHandlerImpl,
  DiaCalendarioUpdateCommandHandlerImpl,
} from "@/modules/horarios/dia-calendario/application/commands";
import {
  DiaCalendarioFindOneQueryHandlerImpl,
  DiaCalendarioListQueryHandlerImpl,
} from "@/modules/horarios/dia-calendario/application/queries";
import { IDiaCalendarioPermissionChecker } from "@/modules/horarios/dia-calendario/domain/authorization";
import {
  IDiaCalendarioCreateCommandHandler,
  IDiaCalendarioDeleteCommandHandler,
  IDiaCalendarioUpdateCommandHandler,
} from "@/modules/horarios/dia-calendario/domain/commands";
import {
  IDiaCalendarioFindOneQueryHandler,
  IDiaCalendarioListQueryHandler,
} from "@/modules/horarios/dia-calendario/domain/queries";
import { IDiaCalendarioRepository } from "@/modules/horarios/dia-calendario/domain/repositories";
import { DiaCalendarioTypeOrmRepositoryAdapter } from "@/modules/horarios/dia-calendario/infrastructure.database";
import { DiaCalendarioGraphqlResolver } from "@/modules/horarios/dia-calendario/presentation.graphql/dia-calendario.graphql.resolver";
import { DiaCalendarioRestController } from "@/modules/horarios/dia-calendario/presentation.rest/dia-calendario.rest.controller";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: IDiaCalendarioRepository,
      useClass: DiaCalendarioTypeOrmRepositoryAdapter,
    },
    DiaCalendarioGraphqlResolver,
    {
      provide: IDiaCalendarioPermissionChecker,
      useClass: DiaCalendarioPermissionCheckerImpl,
    },

    // Commands
    {
      provide: IDiaCalendarioCreateCommandHandler,
      useClass: DiaCalendarioCreateCommandHandlerImpl,
    },
    {
      provide: IDiaCalendarioUpdateCommandHandler,
      useClass: DiaCalendarioUpdateCommandHandlerImpl,
    },
    {
      provide: IDiaCalendarioDeleteCommandHandler,
      useClass: DiaCalendarioDeleteCommandHandlerImpl,
    },
    // Queries
    { provide: IDiaCalendarioListQueryHandler, useClass: DiaCalendarioListQueryHandlerImpl },
    { provide: IDiaCalendarioFindOneQueryHandler, useClass: DiaCalendarioFindOneQueryHandlerImpl },
  ],
  controllers: [DiaCalendarioRestController],
  exports: [],
})
export class DiaCalendarioModule {}
