import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { INTERVALO_DE_TEMPO_REPOSITORY_PORT } from "@/modules/horarios/intervalo-de-tempo/application/ports";
import { IntervaloDeTempoCreateOrUpdateCommandHandlerImpl } from "@/modules/horarios/intervalo-de-tempo/application/use-cases/commands";
import { IntervaloDeTempoService } from "@/modules/horarios/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import {
  IntervaloDeTempoFindOneQueryHandlerImpl,
  IntervaloDeTempoListQueryHandlerImpl,
} from "@/modules/horarios/intervalo-de-tempo/application/use-cases/queries";
import { IIntervaloDeTempoCreateOrUpdateCommandHandler } from "@/modules/horarios/intervalo-de-tempo/domain/commands";
import {
  IIntervaloDeTempoFindOneQueryHandler,
  IIntervaloDeTempoListQueryHandler,
} from "@/modules/horarios/intervalo-de-tempo/domain/queries";
import { IntervaloDeTempoTypeOrmRepositoryAdapter } from "@/modules/horarios/intervalo-de-tempo/infrastructure/persistence/typeorm";
import { IntervaloDeTempoGraphqlResolver } from "@/modules/horarios/intervalo-de-tempo/presentation/graphql/intervalo-de-tempo.graphql.resolver";
import { IntervaloDeTempoRestController } from "@/modules/horarios/intervalo-de-tempo/presentation/rest/intervalo-de-tempo.rest.controller";

@Module({
  imports: [],
  controllers: [IntervaloDeTempoRestController],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: INTERVALO_DE_TEMPO_REPOSITORY_PORT,
      useClass: IntervaloDeTempoTypeOrmRepositoryAdapter,
    },
    IntervaloDeTempoService,
    IntervaloDeTempoGraphqlResolver,

    // Commands
    {
      provide: IIntervaloDeTempoCreateOrUpdateCommandHandler,
      useClass: IntervaloDeTempoCreateOrUpdateCommandHandlerImpl,
    },
    // Queries
    { provide: IIntervaloDeTempoListQueryHandler, useClass: IntervaloDeTempoListQueryHandlerImpl },
    {
      provide: IIntervaloDeTempoFindOneQueryHandler,
      useClass: IntervaloDeTempoFindOneQueryHandlerImpl,
    },
  ],
  exports: [IntervaloDeTempoService],
})
export class IntervaloDeTempoModule {}
