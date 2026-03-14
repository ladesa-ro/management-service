import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { DISPONIBILIDADE_REPOSITORY_PORT } from "@/modules/ensino/disponibilidade/application/ports";
import {
  DisponibilidadeCreateCommandHandlerImpl,
  DisponibilidadeDeleteCommandHandlerImpl,
  DisponibilidadeUpdateCommandHandlerImpl,
} from "@/modules/ensino/disponibilidade/application/use-cases/commands";
import { DisponibilidadeService } from "@/modules/ensino/disponibilidade/application/use-cases/disponibilidade.service";
import {
  DisponibilidadeFindOneQueryHandlerImpl,
  DisponibilidadeListQueryHandlerImpl,
} from "@/modules/ensino/disponibilidade/application/use-cases/queries";
import {
  IDisponibilidadeCreateCommandHandler,
  IDisponibilidadeDeleteCommandHandler,
  IDisponibilidadeUpdateCommandHandler,
} from "@/modules/ensino/disponibilidade/domain/commands";
import {
  IDisponibilidadeFindOneQueryHandler,
  IDisponibilidadeListQueryHandler,
} from "@/modules/ensino/disponibilidade/domain/queries";
import { DisponibilidadeAuthzRegistrySetup } from "@/modules/ensino/disponibilidade/infrastructure";
import { DisponibilidadeTypeOrmRepositoryAdapter } from "@/modules/ensino/disponibilidade/infrastructure/persistence/typeorm";
import { DisponibilidadeGraphqlResolver } from "@/modules/ensino/disponibilidade/presentation/graphql/disponibilidade.graphql.resolver";
import { DisponibilidadeRestController } from "@/modules/ensino/disponibilidade/presentation/rest/disponibilidade.rest.controller";

@Module({
  imports: [],
  controllers: [DisponibilidadeRestController],
  providers: [
    NestJsPaginateAdapter,
    DisponibilidadeService,
    DisponibilidadeGraphqlResolver,
    DisponibilidadeAuthzRegistrySetup,
    {
      provide: DISPONIBILIDADE_REPOSITORY_PORT,
      useClass: DisponibilidadeTypeOrmRepositoryAdapter,
    },

    // Commands
    {
      provide: IDisponibilidadeCreateCommandHandler,
      useClass: DisponibilidadeCreateCommandHandlerImpl,
    },
    {
      provide: IDisponibilidadeUpdateCommandHandler,
      useClass: DisponibilidadeUpdateCommandHandlerImpl,
    },
    {
      provide: IDisponibilidadeDeleteCommandHandler,
      useClass: DisponibilidadeDeleteCommandHandlerImpl,
    },
    // Queries
    { provide: IDisponibilidadeListQueryHandler, useClass: DisponibilidadeListQueryHandlerImpl },
    {
      provide: IDisponibilidadeFindOneQueryHandler,
      useClass: DisponibilidadeFindOneQueryHandlerImpl,
    },
  ],
  exports: [DisponibilidadeService],
})
export class DisponibilidadeModule {}
