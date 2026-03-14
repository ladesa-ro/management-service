import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { CalendarioLetivoModule } from "@/modules/horarios/calendario-letivo/calendario-letivo.module";
import {
  HORARIO_GERADO_REPOSITORY_PORT,
  HorarioGeradoService,
} from "@/modules/horarios/horario-gerado";
import {
  HorarioGeradoCreateCommandHandlerImpl,
  HorarioGeradoDeleteCommandHandlerImpl,
  HorarioGeradoUpdateCommandHandlerImpl,
} from "@/modules/horarios/horario-gerado/application/use-cases/commands";
import {
  HorarioGeradoFindOneQueryHandlerImpl,
  HorarioGeradoListQueryHandlerImpl,
} from "@/modules/horarios/horario-gerado/application/use-cases/queries";
import {
  IHorarioGeradoCreateCommandHandler,
  IHorarioGeradoDeleteCommandHandler,
  IHorarioGeradoUpdateCommandHandler,
} from "@/modules/horarios/horario-gerado/domain/commands";
import {
  IHorarioGeradoFindOneQueryHandler,
  IHorarioGeradoListQueryHandler,
} from "@/modules/horarios/horario-gerado/domain/queries";
import { HorarioGeradoAuthzRegistrySetup } from "@/modules/horarios/horario-gerado/infrastructure";
import { HorarioGeradoTypeOrmRepositoryAdapter } from "@/modules/horarios/horario-gerado/infrastructure/persistence/typeorm";
import { HorarioGeradoGraphqlResolver } from "@/modules/horarios/horario-gerado/presentation/graphql/horario-gerado.graphql.resolver";
import { HorarioGeradoRestController } from "@/modules/horarios/horario-gerado/presentation/rest/horario-gerado.rest.controller";

@Module({
  imports: [CalendarioLetivoModule],
  controllers: [HorarioGeradoRestController],
  providers: [
    NestJsPaginateAdapter,
    HorarioGeradoService,
    HorarioGeradoAuthzRegistrySetup,
    HorarioGeradoGraphqlResolver,
    {
      provide: HORARIO_GERADO_REPOSITORY_PORT,
      useClass: HorarioGeradoTypeOrmRepositoryAdapter,
    },

    // Commands
    {
      provide: IHorarioGeradoCreateCommandHandler,
      useClass: HorarioGeradoCreateCommandHandlerImpl,
    },
    {
      provide: IHorarioGeradoUpdateCommandHandler,
      useClass: HorarioGeradoUpdateCommandHandlerImpl,
    },
    {
      provide: IHorarioGeradoDeleteCommandHandler,
      useClass: HorarioGeradoDeleteCommandHandlerImpl,
    },
    // Queries
    { provide: IHorarioGeradoListQueryHandler, useClass: HorarioGeradoListQueryHandlerImpl },
    { provide: IHorarioGeradoFindOneQueryHandler, useClass: HorarioGeradoFindOneQueryHandlerImpl },
  ],
  exports: [HorarioGeradoService],
})
export class HorarioGeradoModule {}
