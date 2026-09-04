import { forwardRef, Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { NotificacaoModule } from "@/modules/acesso/notificacao/notificacao.module";
import { UsuarioModule } from "@/modules/acesso/usuario/usuario.module";
import { EmpresaModule } from "@/modules/estagio/empresa/empresa.module";
import { EstagiarioModule } from "@/modules/estagio/estagiario/estagiario.module";
import { EstagioPermissionCheckerImpl } from "@/modules/estagio/estagio/application/authorization";
import {
  EstagioCreateCommandHandlerImpl,
  EstagioDeleteCommandHandlerImpl,
  EstagioSolicitarCommandHandlerImpl,
  EstagioUpdateCommandHandlerImpl,
} from "@/modules/estagio/estagio/application/commands";
import {
  EstagioFindOneQueryHandlerImpl,
  EstagioListQueryHandlerImpl,
} from "@/modules/estagio/estagio/application/queries";
import { IEstagioPermissionChecker } from "@/modules/estagio/estagio/domain/authorization";
import {
  IEstagioCreateCommandHandler,
  IEstagioDeleteCommandHandler,
  IEstagioSolicitarCommandHandler,
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
  imports: [
    forwardRef(() => UsuarioModule),
    EmpresaModule,
    EstagiarioModule,
    // Fornece EstagioNotificacaoPushService e NotificacaoGateway
    NotificacaoModule,
  ],
  controllers: [EstagioRestController],
  providers: [
    NestJsPaginateAdapter,
    EstagioGraphqlResolver,
    {
      provide: IEstagioRepository,
      useClass: EstagioTypeOrmRepositoryAdapter,
    },
    {
      provide: IEstagioPermissionChecker,
      useClass: EstagioPermissionCheckerImpl,
    },

    // Commands
    { provide: IEstagioCreateCommandHandler, useClass: EstagioCreateCommandHandlerImpl },
    { provide: IEstagioSolicitarCommandHandler, useClass: EstagioSolicitarCommandHandlerImpl },
    { provide: IEstagioUpdateCommandHandler, useClass: EstagioUpdateCommandHandlerImpl },
    { provide: IEstagioDeleteCommandHandler, useClass: EstagioDeleteCommandHandlerImpl },
    // Queries
    { provide: IEstagioListQueryHandler, useClass: EstagioListQueryHandlerImpl },
    { provide: IEstagioFindOneQueryHandler, useClass: EstagioFindOneQueryHandlerImpl },
  ],
  exports: [
    IEstagioFindOneQueryHandler,
    IEstagioRepository,
    IEstagioCreateCommandHandler,
    IEstagioSolicitarCommandHandler,
    IEstagioPermissionChecker,
  ],
})
export class EstagioModule {}
