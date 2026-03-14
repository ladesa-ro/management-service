import { Module } from "@nestjs/common";
import { KeycloakModule } from "@/modules/@seguranca/provedor-identidade";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  UsuarioCreateCommandHandlerImpl,
  UsuarioDeleteCommandHandlerImpl,
  UsuarioUpdateCommandHandlerImpl,
  UsuarioUpdateImagemCapaCommandHandlerImpl,
  UsuarioUpdateImagemPerfilCommandHandlerImpl,
} from "@/modules/acesso/usuario/application/use-cases/commands";
import {
  UsuarioEnsinoQueryHandlerImpl,
  UsuarioFindByIdSimpleQueryHandlerImpl,
  UsuarioFindByMatriculaQueryHandlerImpl,
  UsuarioFindOneQueryHandlerImpl,
  UsuarioGetImagemCapaQueryHandlerImpl,
  UsuarioGetImagemPerfilQueryHandlerImpl,
  UsuarioListQueryHandlerImpl,
} from "@/modules/acesso/usuario/application/use-cases/queries";
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
import { USUARIO_REPOSITORY_PORT } from "@/modules/acesso/usuario/domain/repositories";
import {
  UsuarioAuthzRegistrySetup,
  UsuarioTypeOrmRepositoryAdapter,
} from "@/modules/acesso/usuario/infrastructure";
import { UsuarioGraphqlResolver } from "@/modules/acesso/usuario/presentation/graphql/usuario.graphql.resolver";
import { UsuarioRestController } from "@/modules/acesso/usuario/presentation/rest/usuario.rest.controller";
import { ArquivoModule } from "@/modules/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/modules/armazenamento/imagem/imagem.module";

@Module({
  imports: [KeycloakModule, ImagemModule, ArquivoModule],
  controllers: [UsuarioRestController],
  providers: [
    NestJsPaginateAdapter,
    UsuarioGraphqlResolver,
    UsuarioAuthzRegistrySetup,
    {
      provide: USUARIO_REPOSITORY_PORT,
      useClass: UsuarioTypeOrmRepositoryAdapter,
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
