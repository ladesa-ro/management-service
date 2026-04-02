import { Module } from "@nestjs/common";
import {
  TurmaDisponibilidadeDeactivateCommandHandlerImpl,
  TurmaDisponibilidadeSaveCommandHandlerImpl,
} from "./application/commands";
import {
  TurmaDisponibilidadeFindAllActiveQueryHandlerImpl,
  TurmaDisponibilidadeFindByWeekQueryHandlerImpl,
} from "./application/queries";
import {
  ITurmaDisponibilidadeDeactivateCommandHandler,
  ITurmaDisponibilidadeSaveCommandHandler,
} from "./domain/commands";
import {
  ITurmaDisponibilidadeFindAllActiveQueryHandler,
  ITurmaDisponibilidadeFindByWeekQueryHandler,
} from "./domain/queries";
import { ITurmaDisponibilidadeRepository } from "./domain/repositories";
import { TurmaDisponibilidadeTypeOrmRepositoryAdapter } from "./infrastructure.database";
import { TurmaDisponibilidadeRestController } from "./presentation.rest/turma-disponibilidade.rest.controller";

@Module({
  controllers: [TurmaDisponibilidadeRestController],
  providers: [
    {
      provide: ITurmaDisponibilidadeRepository,
      useClass: TurmaDisponibilidadeTypeOrmRepositoryAdapter,
    },

    // Commands
    {
      provide: ITurmaDisponibilidadeSaveCommandHandler,
      useClass: TurmaDisponibilidadeSaveCommandHandlerImpl,
    },
    {
      provide: ITurmaDisponibilidadeDeactivateCommandHandler,
      useClass: TurmaDisponibilidadeDeactivateCommandHandlerImpl,
    },

    // Queries
    {
      provide: ITurmaDisponibilidadeFindByWeekQueryHandler,
      useClass: TurmaDisponibilidadeFindByWeekQueryHandlerImpl,
    },
    {
      provide: ITurmaDisponibilidadeFindAllActiveQueryHandler,
      useClass: TurmaDisponibilidadeFindAllActiveQueryHandlerImpl,
    },
  ],
  exports: [],
})
export class TurmaDisponibilidadeModule {}
