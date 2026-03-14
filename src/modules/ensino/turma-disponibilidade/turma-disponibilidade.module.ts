import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { DisponibilidadeModule } from "@/modules/ensino/disponibilidade/disponibilidade.module";
import { TurmaModule } from "@/modules/ensino/turma/turma.module";
import {
  TURMA_DISPONIBILIDADE_REPOSITORY_PORT,
  TurmaDisponibilidadeService,
} from "@/modules/ensino/turma-disponibilidade";
import {
  TurmaDisponibilidadeCreateCommandHandlerImpl,
  TurmaDisponibilidadeDeleteCommandHandlerImpl,
  TurmaDisponibilidadeUpdateCommandHandlerImpl,
} from "@/modules/ensino/turma-disponibilidade/application/use-cases/commands";
import {
  TurmaDisponibilidadeFindOneQueryHandlerImpl,
  TurmaDisponibilidadeListQueryHandlerImpl,
} from "@/modules/ensino/turma-disponibilidade/application/use-cases/queries";
import {
  ITurmaDisponibilidadeCreateCommandHandler,
  ITurmaDisponibilidadeDeleteCommandHandler,
  ITurmaDisponibilidadeUpdateCommandHandler,
} from "@/modules/ensino/turma-disponibilidade/domain/commands";
import {
  ITurmaDisponibilidadeFindOneQueryHandler,
  ITurmaDisponibilidadeListQueryHandler,
} from "@/modules/ensino/turma-disponibilidade/domain/queries";
import { TurmaDisponibilidadeAuthzRegistrySetup } from "@/modules/ensino/turma-disponibilidade/infrastructure";
import { TurmaDisponibilidadeTypeOrmRepositoryAdapter } from "@/modules/ensino/turma-disponibilidade/infrastructure/persistence/typeorm";
import { TurmaDisponibilidadeGraphqlResolver } from "@/modules/ensino/turma-disponibilidade/presentation/graphql/turma-disponibilidade.graphql.resolver";
import { TurmaDisponibilidadeRestController } from "@/modules/ensino/turma-disponibilidade/presentation/rest";

@Module({
  imports: [TurmaModule, DisponibilidadeModule],
  controllers: [TurmaDisponibilidadeRestController],
  providers: [
    NestJsPaginateAdapter,
    TurmaDisponibilidadeService,
    TurmaDisponibilidadeAuthzRegistrySetup,
    TurmaDisponibilidadeGraphqlResolver,
    {
      provide: TURMA_DISPONIBILIDADE_REPOSITORY_PORT,
      useClass: TurmaDisponibilidadeTypeOrmRepositoryAdapter,
    },

    // Commands
    {
      provide: ITurmaDisponibilidadeCreateCommandHandler,
      useClass: TurmaDisponibilidadeCreateCommandHandlerImpl,
    },
    {
      provide: ITurmaDisponibilidadeUpdateCommandHandler,
      useClass: TurmaDisponibilidadeUpdateCommandHandlerImpl,
    },
    {
      provide: ITurmaDisponibilidadeDeleteCommandHandler,
      useClass: TurmaDisponibilidadeDeleteCommandHandlerImpl,
    },
    // Queries
    {
      provide: ITurmaDisponibilidadeListQueryHandler,
      useClass: TurmaDisponibilidadeListQueryHandlerImpl,
    },
    {
      provide: ITurmaDisponibilidadeFindOneQueryHandler,
      useClass: TurmaDisponibilidadeFindOneQueryHandlerImpl,
    },
  ],
  exports: [TurmaDisponibilidadeService],
})
export class TurmaDisponibilidadeModule {}
