import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { UsuarioModule } from "@/modules/acesso/usuario/usuario.module";
import {
  EstagiarioCreateCommandHandlerImpl,
  EstagiarioDeleteCommandHandlerImpl,
  EstagiarioUpdateCommandHandlerImpl,
} from "@/modules/estagio/estagiario/application/commands";
import {
  EstagiarioFindOneQueryHandlerImpl,
  EstagiarioListQueryHandlerImpl,
} from "@/modules/estagio/estagiario/application/queries";
import {
  IEstagiarioCreateCommandHandler,
  IEstagiarioDeleteCommandHandler,
  IEstagiarioUpdateCommandHandler,
} from "@/modules/estagio/estagiario/domain/commands";
import {
  IEstagiarioFindOneQueryHandler,
  IEstagiarioListQueryHandler,
} from "@/modules/estagio/estagiario/domain/queries";
import { IEstagiarioRepository } from "@/modules/estagio/estagiario/domain/repositories";
import { EstagiarioTypeOrmRepositoryAdapter } from "@/modules/estagio/estagiario/infrastructure.database";
import { EstagiarioGraphqlResolver } from "@/modules/estagio/estagiario/presentation.graphql";
import { EstagiarioRestController } from "@/modules/estagio/estagiario/presentation.rest/estagiario.rest.controller";

@Module({
  imports: [UsuarioModule],
  controllers: [EstagiarioRestController],
  providers: [
    NestJsPaginateAdapter,
    EstagiarioGraphqlResolver,
    {
      provide: IEstagiarioRepository,
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
