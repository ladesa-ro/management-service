import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { UsuarioModule } from "@/modules/acesso/usuario/usuario.module";
import { CampusModule } from "@/modules/ambientes/campus/campus.module";
import { CursoModule } from "@/modules/ensino/curso/curso.module";
import { EmpresaModule } from "@/modules/estagio/empresa/empresa.module";
import { EstagiarioModule } from "@/modules/estagio/estagiario/estagiario.module";
import {
  EstagioCreateCommandHandlerImpl,
  EstagioDeleteCommandHandlerImpl,
  EstagioImportBulkCommandHandlerImpl,
  EstagioUpdateCommandHandlerImpl,
} from "@/modules/estagio/estagio/application/commands";
import {
  EstagioFindOneQueryHandlerImpl,
  EstagioListQueryHandlerImpl,
} from "@/modules/estagio/estagio/application/queries";
import {
  IEstagioCreateCommandHandler,
  IEstagioDeleteCommandHandler,
  IEstagioImportBulkCommandHandler,
  IEstagioUpdateCommandHandler,
} from "@/modules/estagio/estagio/domain/commands";
import {
  IEstagioFindOneQueryHandler,
  IEstagioListQueryHandler,
} from "@/modules/estagio/estagio/domain/queries";
import { IEstagioRepository } from "@/modules/estagio/estagio/domain/repositories";
import { EstagioTypeOrmRepositoryAdapter } from "@/modules/estagio/estagio/infrastructure.database";
import { EstagioGraphqlResolver } from "@/modules/estagio/estagio/presentation.graphql";
import { EstagioRestController } from "@/modules/estagio/estagio/presentation.rest/estagio.rest.controller";

@Module({
  imports: [EstagiarioModule, EmpresaModule, UsuarioModule, CursoModule, CampusModule],
  controllers: [EstagioRestController],
  providers: [
    NestJsPaginateAdapter,
    EstagioGraphqlResolver,
    {
      provide: IEstagioRepository,
      useClass: EstagioTypeOrmRepositoryAdapter,
    },

    // Commands
    { provide: IEstagioCreateCommandHandler, useClass: EstagioCreateCommandHandlerImpl },
    { provide: IEstagioUpdateCommandHandler, useClass: EstagioUpdateCommandHandlerImpl },
    { provide: IEstagioDeleteCommandHandler, useClass: EstagioDeleteCommandHandlerImpl },
    { provide: IEstagioImportBulkCommandHandler, useClass: EstagioImportBulkCommandHandlerImpl },
    // Queries
    { provide: IEstagioListQueryHandler, useClass: EstagioListQueryHandlerImpl },
    { provide: IEstagioFindOneQueryHandler, useClass: EstagioFindOneQueryHandlerImpl },
  ],
  exports: [IEstagioFindOneQueryHandler],
})
export class EstagioModule {}
