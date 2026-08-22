import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { NotificacaoModule } from "@/modules/acesso/notificacao/notificacao.module";
import { UsuarioModule } from "@/modules/acesso/usuario/usuario.module";
import {
  CalendarioColecaoAcessoPermissionCheckerImpl,
  CalendarioColecaoPermissionCheckerImpl,
} from "./application/authorization";
import { CalendarioColecaoAcessoResolverService } from "./application/calendario-colecao-acesso-resolver.service";
import { CalendarioColecaoSyncService } from "./application/calendario-colecao-sync.service";
import {
  CalendarioColecaoAcessoConcederCommandHandlerImpl,
  CalendarioColecaoAcessoRevogarCommandHandlerImpl,
  CalendarioColecaoCreateCommandHandlerImpl,
  CalendarioColecaoDeleteCommandHandlerImpl,
  CalendarioColecaoTransferirDonoCommandHandlerImpl,
  CalendarioColecaoUpdateCommandHandlerImpl,
} from "./application/commands";
import {
  CalendarioColecaoAcessoListQueryHandlerImpl,
  CalendarioColecaoFindOneQueryHandlerImpl,
  CalendarioColecaoListQueryHandlerImpl,
} from "./application/queries";
import {
  ICalendarioColecaoAcessoPermissionChecker,
  ICalendarioColecaoPermissionChecker,
} from "./domain/authorization";
import { ICalendarioColecaoAcessoConcederCommandHandler } from "./domain/commands/calendario-colecao-acesso-conceder.command.handler.interface";
import { ICalendarioColecaoAcessoRevogarCommandHandler } from "./domain/commands/calendario-colecao-acesso-revogar.command.handler.interface";
import { ICalendarioColecaoCreateCommandHandler } from "./domain/commands/calendario-colecao-create.command.handler.interface";
import { ICalendarioColecaoDeleteCommandHandler } from "./domain/commands/calendario-colecao-delete.command.handler.interface";
import { ICalendarioColecaoTransferirDonoCommandHandler } from "./domain/commands/calendario-colecao-transferir-dono.command.handler.interface";
import { ICalendarioColecaoUpdateCommandHandler } from "./domain/commands/calendario-colecao-update.command.handler.interface";
import { ICalendarioColecaoAcessoListQueryHandler } from "./domain/queries/calendario-colecao-acesso-list.query.handler.interface";
import { ICalendarioColecaoFindOneQueryHandler } from "./domain/queries/calendario-colecao-find-one.query.handler.interface";
import { ICalendarioColecaoListQueryHandler } from "./domain/queries/calendario-colecao-list.query.handler.interface";
import {
  ICalendarioColecaoAcessoRepository,
  ICalendarioColecaoRepository,
} from "./domain/repositories";
import { CalendarioColecaoTypeOrmRepositoryAdapter } from "./infrastructure.database/calendario-colecao.repository";
import { CalendarioColecaoAcessoTypeOrmRepositoryAdapter } from "./infrastructure.database/calendario-colecao-acesso.repository";
import { CalendarioColecaoRestController } from "./presentation.rest/calendario-colecao.rest.controller";
import { CalendarioColecaoAcessoRestController } from "./presentation.rest/calendario-colecao-acesso.rest.controller";

@Module({
  imports: [UsuarioModule, NotificacaoModule],
  controllers: [CalendarioColecaoRestController, CalendarioColecaoAcessoRestController],
  providers: [
    NestJsPaginateAdapter,
    CalendarioColecaoAcessoResolverService,
    CalendarioColecaoSyncService,
    {
      provide: ICalendarioColecaoPermissionChecker,
      useClass: CalendarioColecaoPermissionCheckerImpl,
    },
    {
      provide: ICalendarioColecaoRepository,
      useClass: CalendarioColecaoTypeOrmRepositoryAdapter,
    },
    {
      provide: ICalendarioColecaoCreateCommandHandler,
      useClass: CalendarioColecaoCreateCommandHandlerImpl,
    },
    {
      provide: ICalendarioColecaoUpdateCommandHandler,
      useClass: CalendarioColecaoUpdateCommandHandlerImpl,
    },
    {
      provide: ICalendarioColecaoDeleteCommandHandler,
      useClass: CalendarioColecaoDeleteCommandHandlerImpl,
    },
    {
      provide: ICalendarioColecaoTransferirDonoCommandHandler,
      useClass: CalendarioColecaoTransferirDonoCommandHandlerImpl,
    },
    {
      provide: ICalendarioColecaoFindOneQueryHandler,
      useClass: CalendarioColecaoFindOneQueryHandlerImpl,
    },
    {
      provide: ICalendarioColecaoListQueryHandler,
      useClass: CalendarioColecaoListQueryHandlerImpl,
    },
    {
      provide: ICalendarioColecaoAcessoPermissionChecker,
      useClass: CalendarioColecaoAcessoPermissionCheckerImpl,
    },
    {
      provide: ICalendarioColecaoAcessoRepository,
      useClass: CalendarioColecaoAcessoTypeOrmRepositoryAdapter,
    },
    {
      provide: ICalendarioColecaoAcessoConcederCommandHandler,
      useClass: CalendarioColecaoAcessoConcederCommandHandlerImpl,
    },
    {
      provide: ICalendarioColecaoAcessoRevogarCommandHandler,
      useClass: CalendarioColecaoAcessoRevogarCommandHandlerImpl,
    },
    {
      provide: ICalendarioColecaoAcessoListQueryHandler,
      useClass: CalendarioColecaoAcessoListQueryHandlerImpl,
    },
  ],
  exports: [
    ICalendarioColecaoRepository,
    ICalendarioColecaoFindOneQueryHandler,
    ICalendarioColecaoAcessoRepository,
    CalendarioColecaoAcessoResolverService,
    CalendarioColecaoSyncService,
  ],
})
export class CalendarioColecaoModule {}
