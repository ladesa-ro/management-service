import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { PerfilSetVinculosCommandHandlerImpl } from "@/modules/acesso/perfil/application/use-cases/commands";
import {
  PerfilFindAllActiveQueryHandlerImpl,
  PerfilFindOneQueryHandlerImpl,
  PerfilListQueryHandlerImpl,
} from "@/modules/acesso/perfil/application/use-cases/queries";
import { IPerfilSetVinculosCommandHandler } from "@/modules/acesso/perfil/domain/commands";
import {
  IPerfilFindAllActiveQueryHandler,
  IPerfilFindOneQueryHandler,
  IPerfilListQueryHandler,
} from "@/modules/acesso/perfil/domain/queries";
import { PERFIL_REPOSITORY_PORT } from "@/modules/acesso/perfil/domain/repositories";
import {
  PerfilAuthzRegistrySetup,
  PerfilTypeOrmRepositoryAdapter,
} from "@/modules/acesso/perfil/infrastructure";
import { PerfilGraphqlResolver } from "@/modules/acesso/perfil/presentation/graphql/perfil.graphql.resolver";
import { PerfilRestController } from "@/modules/acesso/perfil/presentation/rest/perfil.rest.controller";
import { UsuarioModule } from "@/modules/acesso/usuario/usuario.module";
import { CampusModule } from "@/modules/ambientes/campus/campus.module";

@Module({
  imports: [UsuarioModule, CampusModule],
  controllers: [PerfilRestController],
  providers: [
    NestJsPaginateAdapter,
    PerfilGraphqlResolver,
    PerfilAuthzRegistrySetup,
    {
      provide: PERFIL_REPOSITORY_PORT,
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
