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
import {
  UsuarioDisponibilidadeTypeOrmRepositoryAdapter,
  UsuarioEventoTypeOrmRepositoryAdapter,
  UsuarioTypeOrmRepositoryAdapter,
} from "@/modules/acesso/usuario/infrastructure.database";
import { UsuarioGraphqlResolver } from "@/modules/acesso/usuario/presentation.graphql/usuario.graphql.resolver";
import { UsuarioRestController } from "@/modules/acesso/usuario/presentation.rest/usuario.rest.controller";
import { UsuarioEventoRestController } from "@/modules/acesso/usuario/presentation.rest/usuario-evento.rest.controller";
import { ArquivoModule } from "@/modules/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/modules/armazenamento/imagem/imagem.module";
import { HorarioConsultaModule } from "@/modules/horarios/horario-consulta/horario-consulta.module";

@Module({
  imports: [IdentityProviderModule, ImagemModule, ArquivoModule, HorarioConsultaModule],
  controllers: [UsuarioRestController, UsuarioEventoRestController],
  providers: [
    NestJsPaginateAdapter,
    UsuarioGraphqlResolver,
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

    // Commands
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
    // Queries
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
  ],
  exports: [
    IUsuarioFindOneQueryHandler,
    IUsuarioFindByIdSimpleQueryHandler,
    IUsuarioFindByMatriculaQueryHandler,
    IUsuarioEnsinoQueryHandler,
  ],
})
export class UsuarioModule {}
