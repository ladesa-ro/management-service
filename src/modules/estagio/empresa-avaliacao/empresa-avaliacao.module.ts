import { Module } from "@nestjs/common";
import {
  EmpresaAvaliacaoCreateCommandHandlerImpl,
  EmpresaAvaliacaoDeleteCommandHandlerImpl,
  EmpresaAvaliacaoLikeCommandHandlerImpl,
  EmpresaAvaliacaoUnlikeCommandHandlerImpl,
  EmpresaAvaliacaoUpdateCommandHandlerImpl,
  EmpresaScoreRecalculateCommandHandlerImpl,
} from "./application/commands";
import {
  EmpresaAvaliacaoFindMyQueryHandlerImpl,
  EmpresaAvaliacaoFindOneQueryHandlerImpl,
  EmpresaAvaliacaoHistoricoListQueryHandlerImpl,
  EmpresaAvaliacaoListQueryHandlerImpl,
  EmpresaScoreFindOneQueryHandlerImpl,
} from "./application/queries";
import {
  IEmpresaAvaliacaoCreateCommandHandler,
  IEmpresaAvaliacaoDeleteCommandHandler,
  IEmpresaAvaliacaoLikeCommandHandler,
  IEmpresaAvaliacaoUnlikeCommandHandler,
  IEmpresaAvaliacaoUpdateCommandHandler,
  IEmpresaScoreRecalculateCommandHandler,
} from "./domain/commands";
import {
  IEmpresaAvaliacaoFindMyQueryHandler,
  IEmpresaAvaliacaoFindOneQueryHandler,
  IEmpresaAvaliacaoHistoricoListQueryHandler,
  IEmpresaAvaliacaoListQueryHandler,
  IEmpresaScoreFindOneQueryHandler,
} from "./domain/queries";
import { IEmpresaAvaliacaoRepository, IEmpresaScoreRepository } from "./domain/repositories";
import {
  EmpresaAvaliacaoTypeOrmRepositoryAdapter,
  EmpresaScoreTypeOrmRepositoryAdapter,
} from "./infrastructure.database";
import { EmpresaAvaliacaoRestController, EmpresaScoreRestController } from "./presentation.rest";

@Module({
  imports: [],
  controllers: [EmpresaAvaliacaoRestController, EmpresaScoreRestController],
  providers: [
    // Repositories
    {
      provide: IEmpresaAvaliacaoRepository,
      useClass: EmpresaAvaliacaoTypeOrmRepositoryAdapter,
    },
    {
      provide: IEmpresaScoreRepository,
      useClass: EmpresaScoreTypeOrmRepositoryAdapter,
    },

    // Commands
    {
      provide: IEmpresaAvaliacaoCreateCommandHandler,
      useClass: EmpresaAvaliacaoCreateCommandHandlerImpl,
    },
    {
      provide: IEmpresaAvaliacaoUpdateCommandHandler,
      useClass: EmpresaAvaliacaoUpdateCommandHandlerImpl,
    },
    {
      provide: IEmpresaAvaliacaoDeleteCommandHandler,
      useClass: EmpresaAvaliacaoDeleteCommandHandlerImpl,
    },
    {
      provide: IEmpresaAvaliacaoLikeCommandHandler,
      useClass: EmpresaAvaliacaoLikeCommandHandlerImpl,
    },
    {
      provide: IEmpresaAvaliacaoUnlikeCommandHandler,
      useClass: EmpresaAvaliacaoUnlikeCommandHandlerImpl,
    },
    {
      provide: IEmpresaScoreRecalculateCommandHandler,
      useClass: EmpresaScoreRecalculateCommandHandlerImpl,
    },

    // Queries
    {
      provide: IEmpresaAvaliacaoFindOneQueryHandler,
      useClass: EmpresaAvaliacaoFindOneQueryHandlerImpl,
    },
    {
      provide: IEmpresaAvaliacaoListQueryHandler,
      useClass: EmpresaAvaliacaoListQueryHandlerImpl,
    },
    {
      provide: IEmpresaAvaliacaoFindMyQueryHandler,
      useClass: EmpresaAvaliacaoFindMyQueryHandlerImpl,
    },
    {
      provide: IEmpresaScoreFindOneQueryHandler,
      useClass: EmpresaScoreFindOneQueryHandlerImpl,
    },
    {
      provide: IEmpresaAvaliacaoHistoricoListQueryHandler,
      useClass: EmpresaAvaliacaoHistoricoListQueryHandlerImpl,
    },
  ],
  exports: [IEmpresaAvaliacaoRepository, IEmpresaScoreRepository, IEmpresaScoreFindOneQueryHandler],
})
export class EmpresaAvaliacaoModule {}
