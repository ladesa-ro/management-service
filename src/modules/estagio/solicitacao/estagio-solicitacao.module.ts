import { forwardRef, Module } from "@nestjs/common";
import { UsuarioModule } from "@/modules/acesso/usuario/usuario.module";
import { EmpresaModule } from "@/modules/estagio/empresa/empresa.module";
import { EstagiarioModule } from "@/modules/estagio/estagiario/estagiario.module";
import { EstagioModule } from "@/modules/estagio/estagio/estagio.module";
import { EstagioSolicitacaoPermissionCheckerImpl } from "./application/authorization/estagio-solicitacao-permission-checker";
import { EstagioSolicitacaoCancelarCommandHandlerImpl } from "./application/commands/solicitacao-cancelar.command.handler";
import { EstagioSolicitacaoDeferirCommandHandlerImpl } from "./application/commands/solicitacao-deferir.command.handler";
import { EstagioSolicitacaoExternoCreateCommandHandlerImpl } from "./application/commands/solicitacao-externo-create.command.handler";
import { EstagioSolicitacaoIndeferirCommandHandlerImpl } from "./application/commands/solicitacao-indeferir.command.handler";
import { EstagioSolicitacaoInternoCreateCommandHandlerImpl } from "./application/commands/solicitacao-interno-create.command.handler";
import { MinhasSolicitacoesListQueryHandlerImpl } from "./application/queries/minhas-solicitacoes-list.query.handler";
import { EstagioSolicitacaoListQueryHandlerImpl } from "./application/queries/solicitacao-list.query.handler";
import { IEstagioSolicitacaoPermissionChecker } from "./domain/authorization/estagio-solicitacao-permission-checker.interface";
import {
  IEstagioSolicitacaoCancelarCommandHandler,
  IEstagioSolicitacaoDeferirCommandHandler,
  IEstagioSolicitacaoExternoCreateCommandHandler,
  IEstagioSolicitacaoIndeferirCommandHandler,
  IEstagioSolicitacaoInternoCreateCommandHandler,
} from "./domain/commands";
import {
  IEstagioSolicitacaoListQueryHandler,
  IMinhasSolicitacoesListQueryHandler,
} from "./domain/queries";
import { IEstagioSolicitacaoRepository } from "./domain/repositories/estagio-solicitacao.repository.interface";
import { EstagioSolicitacaoTypeOrmRepositoryAdapter } from "./infrastructure.database/estagio-solicitacao.repository";
import { EstagioSolicitacaoRestController } from "./presentation.rest/estagio-solicitacao.rest.controller";
import { MinhasSolicitacoesRestController } from "./presentation.rest/minhas-solicitacoes.rest.controller";

@Module({
  imports: [
    forwardRef(() => EstagioModule),
    forwardRef(() => EmpresaModule),
    EstagiarioModule,
    UsuarioModule,
  ],
  controllers: [EstagioSolicitacaoRestController, MinhasSolicitacoesRestController],
  providers: [
    {
      provide: IEstagioSolicitacaoRepository,
      useClass: EstagioSolicitacaoTypeOrmRepositoryAdapter,
    },
    {
      provide: IEstagioSolicitacaoPermissionChecker,
      useClass: EstagioSolicitacaoPermissionCheckerImpl,
    },
    {
      provide: IEstagioSolicitacaoInternoCreateCommandHandler,
      useClass: EstagioSolicitacaoInternoCreateCommandHandlerImpl,
    },
    {
      provide: IEstagioSolicitacaoExternoCreateCommandHandler,
      useClass: EstagioSolicitacaoExternoCreateCommandHandlerImpl,
    },
    {
      provide: IEstagioSolicitacaoDeferirCommandHandler,
      useClass: EstagioSolicitacaoDeferirCommandHandlerImpl,
    },
    {
      provide: IEstagioSolicitacaoIndeferirCommandHandler,
      useClass: EstagioSolicitacaoIndeferirCommandHandlerImpl,
    },
    {
      provide: IEstagioSolicitacaoCancelarCommandHandler,
      useClass: EstagioSolicitacaoCancelarCommandHandlerImpl,
    },
    {
      provide: IEstagioSolicitacaoListQueryHandler,
      useClass: EstagioSolicitacaoListQueryHandlerImpl,
    },
    {
      provide: IMinhasSolicitacoesListQueryHandler,
      useClass: MinhasSolicitacoesListQueryHandlerImpl,
    },
  ],
  exports: [
    IEstagioSolicitacaoRepository,
    IEstagioSolicitacaoPermissionChecker,
    IEstagioSolicitacaoInternoCreateCommandHandler,
    IEstagioSolicitacaoExternoCreateCommandHandler,
    IEstagioSolicitacaoDeferirCommandHandler,
    IEstagioSolicitacaoIndeferirCommandHandler,
    IEstagioSolicitacaoCancelarCommandHandler,
    IEstagioSolicitacaoListQueryHandler,
    IMinhasSolicitacoesListQueryHandler,
  ],
})
export class EstagioSolicitacaoModule {}
