import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { IdentityProviderModule } from "@/infrastructure.identity-provider/identity-provider.module";
import { UsuarioPermissionCheckerImpl } from "@/modules/acesso/usuario/application/authorization";
import {
  UsuarioCreateCommandHandlerImpl,
  UsuarioDeleteCommandHandlerImpl,
  UsuarioUpdateCommandHandlerImpl,
  UsuarioUpdateImagemCapaCommandHandlerImpl,
  UsuarioUpdateImagemPerfilCommandHandlerImpl,
} from "@/modules/acesso/usuario/application/commands";
import {
  UsuarioEnsinoQueryHandlerImpl,
  UsuarioFindByIdSimpleQueryHandlerImpl,
  UsuarioFindByMatriculaQueryHandlerImpl,
  UsuarioFindOneQueryHandlerImpl,
  UsuarioGetImagemCapaQueryHandlerImpl,
  UsuarioGetImagemPerfilQueryHandlerImpl,
  UsuarioListQueryHandlerImpl,
} from "@/modules/acesso/usuario/application/queries";
import { UsuarioAvailabilityCheckerImpl } from "@/modules/acesso/usuario/application/services";
import { IUsuarioPermissionChecker } from "@/modules/acesso/usuario/domain/authorization";
import {
  IUsuarioCreateCommandHandler,
  IUsuarioDeleteCommandHandler,
  IUsuarioUpdateCommandHandler,
  IUsuarioUpdateImagemCapaCommandHandler,
  IUsuarioUpdateImagemPerfilCommandHandler,
} from "@/modules/acesso/usuario/domain/commands";
import {
  IUsuarioEnsinoQueryHandler,
  IUsuarioFindByIdSimpleQueryHandler,
  IUsuarioFindByMatriculaQueryHandler,
  IUsuarioFindOneQueryHandler,
  IUsuarioGetImagemCapaQueryHandler,
  IUsuarioGetImagemPerfilQueryHandler,
  IUsuarioListQueryHandler,
} from "@/modules/acesso/usuario/domain/queries";
import {
  IUsuarioDisponibilidadeRepository,
  IUsuarioEventoRepository,
  IUsuarioRepository,
} from "@/modules/acesso/usuario/domain/repositories";
import { IUsuarioAvailabilityChecker } from "@/modules/acesso/usuario/domain/services";
import {
  UsuarioDisponibilidadeTypeOrmRepositoryAdapter,
  UsuarioEventoTypeOrmRepositoryAdapter,
  UsuarioTypeOrmRepositoryAdapter,
} from "@/modules/acesso/usuario/infrastructure.database";
import { PerfilDefinirPerfisAtivosCommandHandlerImpl } from "@/modules/acesso/usuario/perfil/application/commands";
import {
  PerfilFindAllActiveQueryHandlerImpl,
  PerfilFindOneQueryHandlerImpl,
  PerfilListQueryHandlerImpl,
} from "@/modules/acesso/usuario/perfil/application/queries";
import { IPerfilDefinirPerfisAtivosCommandHandler } from "@/modules/acesso/usuario/perfil/domain/commands";
import {
  IPerfilFindAllActiveQueryHandler,
  IPerfilFindOneQueryHandler,
  IPerfilListQueryHandler,
} from "@/modules/acesso/usuario/perfil/domain/queries";
import { IPerfilRepository } from "@/modules/acesso/usuario/perfil/domain/repositories";
import { PerfilTypeOrmRepositoryAdapter } from "@/modules/acesso/usuario/perfil/infrastructure.database";
import { PerfilGraphqlResolver } from "@/modules/acesso/usuario/perfil/presentation.graphql/perfil.graphql.resolver";
import {
  PerfilListRestController,
  PerfilRestController,
} from "@/modules/acesso/usuario/perfil/presentation.rest/perfil.rest.controller";
import { UsuarioGraphqlResolver } from "@/modules/acesso/usuario/presentation.graphql/usuario.graphql.resolver";
import { UsuarioRestController } from "@/modules/acesso/usuario/presentation.rest/usuario.rest.controller";
import { UsuarioEventoRestController } from "@/modules/acesso/usuario/presentation.rest/usuario-evento.rest.controller";
import { CampusModule } from "@/modules/ambientes/campus/campus.module";
import { ArquivoModule } from "@/modules/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/modules/armazenamento/imagem/imagem.module";
import { HorarioConsultaModule } from "@/modules/calendario/horario-consulta/horario-consulta.module";

@Module({
  imports: [
    IdentityProviderModule,
    ImagemModule,
    ArquivoModule,
    HorarioConsultaModule,
    CampusModule,
  ],
  controllers: [
    UsuarioRestController,
    UsuarioEventoRestController,
    PerfilListRestController,
    PerfilRestController,
  ],
  providers: [
    NestJsPaginateAdapter,
    UsuarioGraphqlResolver,
    PerfilGraphqlResolver,
    {
      provide: IUsuarioPermissionChecker,
      useClass: UsuarioPermissionCheckerImpl,
    },
    {
      provide: IUsuarioRepository,
      useClass: UsuarioTypeOrmRepositoryAdapter,
    },
    {
      provide: IUsuarioDisponibilidadeRepository,
      useClass: UsuarioDisponibilidadeTypeOrmRepositoryAdapter,
    },
    {
      provide: IUsuarioEventoRepository,
      useClass: UsuarioEventoTypeOrmRepositoryAdapter,
    },

    // Usuario Services
    { provide: IUsuarioAvailabilityChecker, useClass: UsuarioAvailabilityCheckerImpl },

    // Usuario Commands
    { provide: IUsuarioCreateCommandHandler, useClass: UsuarioCreateCommandHandlerImpl },
    { provide: IUsuarioUpdateCommandHandler, useClass: UsuarioUpdateCommandHandlerImpl },
    { provide: IUsuarioDeleteCommandHandler, useClass: UsuarioDeleteCommandHandlerImpl },
    {
      provide: IUsuarioUpdateImagemCapaCommandHandler,
      useClass: UsuarioUpdateImagemCapaCommandHandlerImpl,
    },
    {
      provide: IUsuarioUpdateImagemPerfilCommandHandler,
      useClass: UsuarioUpdateImagemPerfilCommandHandlerImpl,
    },
    // Usuario Queries
    { provide: IUsuarioListQueryHandler, useClass: UsuarioListQueryHandlerImpl },
    { provide: IUsuarioFindOneQueryHandler, useClass: UsuarioFindOneQueryHandlerImpl },
    {
      provide: IUsuarioFindByIdSimpleQueryHandler,
      useClass: UsuarioFindByIdSimpleQueryHandlerImpl,
    },
    {
      provide: IUsuarioFindByMatriculaQueryHandler,
      useClass: UsuarioFindByMatriculaQueryHandlerImpl,
    },
    { provide: IUsuarioGetImagemCapaQueryHandler, useClass: UsuarioGetImagemCapaQueryHandlerImpl },
    {
      provide: IUsuarioGetImagemPerfilQueryHandler,
      useClass: UsuarioGetImagemPerfilQueryHandlerImpl,
    },
    { provide: IUsuarioEnsinoQueryHandler, useClass: UsuarioEnsinoQueryHandlerImpl },

    // Perfil (sub-entidade de Usuario)
    { provide: IPerfilRepository, useClass: PerfilTypeOrmRepositoryAdapter },
    {
      provide: IPerfilDefinirPerfisAtivosCommandHandler,
      useClass: PerfilDefinirPerfisAtivosCommandHandlerImpl,
    },
    { provide: IPerfilListQueryHandler, useClass: PerfilListQueryHandlerImpl },
    { provide: IPerfilFindOneQueryHandler, useClass: PerfilFindOneQueryHandlerImpl },
    { provide: IPerfilFindAllActiveQueryHandler, useClass: PerfilFindAllActiveQueryHandlerImpl },
  ],
  exports: [
    IUsuarioFindOneQueryHandler,
    IUsuarioFindByIdSimpleQueryHandler,
    IUsuarioFindByMatriculaQueryHandler,
    IUsuarioEnsinoQueryHandler,
    IPerfilFindAllActiveQueryHandler,
    IPerfilFindOneQueryHandler,
    IPerfilListQueryHandler,
  ],
})
export class UsuarioModule {}
