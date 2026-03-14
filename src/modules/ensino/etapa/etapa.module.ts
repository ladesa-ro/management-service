import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { ETAPA_REPOSITORY_PORT, EtapaService } from "@/modules/ensino/etapa";
import {
  EtapaCreateCommandHandlerImpl,
  EtapaDeleteCommandHandlerImpl,
  EtapaUpdateCommandHandlerImpl,
} from "@/modules/ensino/etapa/application/use-cases/commands";
import {
  EtapaFindOneQueryHandlerImpl,
  EtapaListQueryHandlerImpl,
} from "@/modules/ensino/etapa/application/use-cases/queries";
import {
  IEtapaCreateCommandHandler,
  IEtapaDeleteCommandHandler,
  IEtapaUpdateCommandHandler,
} from "@/modules/ensino/etapa/domain/commands";
import {
  IEtapaFindOneQueryHandler,
  IEtapaListQueryHandler,
} from "@/modules/ensino/etapa/domain/queries";
import { EtapaAuthzRegistrySetup } from "@/modules/ensino/etapa/infrastructure";
import { EtapaTypeOrmRepositoryAdapter } from "@/modules/ensino/etapa/infrastructure/persistence/typeorm";
import { EtapaGraphqlResolver } from "@/modules/ensino/etapa/presentation/graphql/etapa.graphql.resolver";
import { EtapaRestController } from "@/modules/ensino/etapa/presentation/rest/etapa.rest.controller";
import { CalendarioLetivoModule } from "@/modules/horarios/calendario-letivo/calendario-letivo.module";

@Module({
  imports: [CalendarioLetivoModule],
  controllers: [EtapaRestController],
  providers: [
    NestJsPaginateAdapter,
    EtapaService,
    EtapaGraphqlResolver,
    EtapaAuthzRegistrySetup,
    {
      provide: ETAPA_REPOSITORY_PORT,
      useClass: EtapaTypeOrmRepositoryAdapter,
    },

    // Commands
    { provide: IEtapaCreateCommandHandler, useClass: EtapaCreateCommandHandlerImpl },
    { provide: IEtapaUpdateCommandHandler, useClass: EtapaUpdateCommandHandlerImpl },
    { provide: IEtapaDeleteCommandHandler, useClass: EtapaDeleteCommandHandlerImpl },
    // Queries
    { provide: IEtapaListQueryHandler, useClass: EtapaListQueryHandlerImpl },
    { provide: IEtapaFindOneQueryHandler, useClass: EtapaFindOneQueryHandlerImpl },
  ],
  exports: [EtapaService],
})
export class EtapaModule {}
