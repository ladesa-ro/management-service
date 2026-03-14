import { Module } from "@nestjs/common";
import {
  EstagiarioCreateCommandHandlerImpl,
  EstagiarioDeleteCommandHandlerImpl,
  EstagiarioUpdateCommandHandlerImpl,
} from "@/modules/estagio/estagiario/application/use-cases/commands";
import {
  EstagiarioFindOneQueryHandlerImpl,
  EstagiarioListQueryHandlerImpl,
} from "@/modules/estagio/estagiario/application/use-cases/queries";
import {
  IEstagiarioCreateCommandHandler,
  IEstagiarioDeleteCommandHandler,
  IEstagiarioUpdateCommandHandler,
} from "@/modules/estagio/estagiario/domain/commands";
import {
  IEstagiarioFindOneQueryHandler,
  IEstagiarioListQueryHandler,
} from "@/modules/estagio/estagiario/domain/queries";
import { ESTAGIARIO_REPOSITORY_PORT } from "@/modules/estagio/estagiario/domain/repositories";
import { EstagiarioTypeOrmRepositoryAdapter } from "@/modules/estagio/estagiario/infrastructure";
import { EstagiarioRestController } from "@/modules/estagio/estagiario/presentation/rest/estagiario.rest.controller";

@Module({
  imports: [],
  controllers: [EstagiarioRestController],
  providers: [
    {
      provide: ESTAGIARIO_REPOSITORY_PORT,
      useClass: EstagiarioTypeOrmRepositoryAdapter,
    },

    // Commands
    { provide: IEstagiarioCreateCommandHandler, useClass: EstagiarioCreateCommandHandlerImpl },
    { provide: IEstagiarioUpdateCommandHandler, useClass: EstagiarioUpdateCommandHandlerImpl },
    { provide: IEstagiarioDeleteCommandHandler, useClass: EstagiarioDeleteCommandHandlerImpl },
    // Queries
    { provide: IEstagiarioListQueryHandler, useClass: EstagiarioListQueryHandlerImpl },
    { provide: IEstagiarioFindOneQueryHandler, useClass: EstagiarioFindOneQueryHandlerImpl },
  ],
  exports: [IEstagiarioFindOneQueryHandler],
})
export class EstagiarioModule {}
