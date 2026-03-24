import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import {
  EstagioCreateCommandHandlerImpl,
  EstagioDeleteCommandHandlerImpl,
  EstagioUpdateCommandHandlerImpl,
} from "@/modules/estagio/estagio/application/commands";
import {
  EstagioFindOneQueryHandlerImpl,
  EstagioListQueryHandlerImpl,
} from "@/modules/estagio/estagio/application/queries";
import {
  IEstagioCreateCommandHandler,
  IEstagioDeleteCommandHandler,
  IEstagioUpdateCommandHandler,
} from "@/modules/estagio/estagio/domain/commands";
import {
  IEstagioFindOneQueryHandler,
  IEstagioListQueryHandler,
} from "@/modules/estagio/estagio/domain/queries";
import { IEstagioRepository } from "@/modules/estagio/estagio/domain/repositories";
import { EstagioTypeOrmRepositoryAdapter } from "@/modules/estagio/estagio/infrastructure.database";
import { EstagioRestController } from "@/modules/estagio/estagio/presentation.rest/estagio.rest.controller";

@Module({
  imports: [],
  controllers: [EstagioRestController],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: IEstagioRepository,
      useClass: EstagioTypeOrmRepositoryAdapter,
    },

    // Commands
    { provide: IEstagioCreateCommandHandler, useClass: EstagioCreateCommandHandlerImpl },
    { provide: IEstagioUpdateCommandHandler, useClass: EstagioUpdateCommandHandlerImpl },
    { provide: IEstagioDeleteCommandHandler, useClass: EstagioDeleteCommandHandlerImpl },
    // Queries
    { provide: IEstagioListQueryHandler, useClass: EstagioListQueryHandlerImpl },
    { provide: IEstagioFindOneQueryHandler, useClass: EstagioFindOneQueryHandlerImpl },
  ],
  exports: [IEstagioFindOneQueryHandler],
})
export class EstagioModule {}
