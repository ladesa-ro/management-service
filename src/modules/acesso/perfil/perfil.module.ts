import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { PerfilSetVinculosCommandHandlerImpl } from "@/modules/acesso/perfil/application/commands";
import {
  PerfilFindAllActiveQueryHandlerImpl,
  PerfilFindOneQueryHandlerImpl,
  PerfilListQueryHandlerImpl,
} from "@/modules/acesso/perfil/application/queries";
import { IPerfilSetVinculosCommandHandler } from "@/modules/acesso/perfil/domain/commands";
import {
  IPerfilFindAllActiveQueryHandler,
  IPerfilFindOneQueryHandler,
  IPerfilListQueryHandler,
} from "@/modules/acesso/perfil/domain/queries";
import { IPerfilRepository } from "@/modules/acesso/perfil/domain/repositories";
import { PerfilTypeOrmRepositoryAdapter } from "@/modules/acesso/perfil/infrastructure.database";
import { PerfilGraphqlResolver } from "@/modules/acesso/perfil/presentation.graphql/perfil.graphql.resolver";
import { PerfilRestController } from "@/modules/acesso/perfil/presentation.rest/perfil.rest.controller";
import { UsuarioModule } from "@/modules/acesso/usuario/usuario.module";
import { CampusModule } from "@/modules/ambientes/campus/campus.module";

@Module({
  imports: [UsuarioModule, CampusModule],
  controllers: [PerfilRestController],
  providers: [
    NestJsPaginateAdapter,
    PerfilGraphqlResolver,
    {
      provide: IPerfilRepository,
      useClass: PerfilTypeOrmRepositoryAdapter,
    },

    // Commands
    { provide: IPerfilSetVinculosCommandHandler, useClass: PerfilSetVinculosCommandHandlerImpl },
    // Queries
    { provide: IPerfilListQueryHandler, useClass: PerfilListQueryHandlerImpl },
    { provide: IPerfilFindOneQueryHandler, useClass: PerfilFindOneQueryHandlerImpl },
    { provide: IPerfilFindAllActiveQueryHandler, useClass: PerfilFindAllActiveQueryHandlerImpl },
  ],
  exports: [IPerfilFindAllActiveQueryHandler, IPerfilFindOneQueryHandler, IPerfilListQueryHandler],
})
export class PerfilModule {}
