import { forwardRef, Module } from "@nestjs/common";
import { NotificacaoModule } from "@/modules/acesso/notificacao/notificacao.module";
import { UsuarioModule } from "@/modules/acesso/usuario/usuario.module";
import { EstagiarioModule } from "@/modules/estagio/estagiario/estagiario.module";
import { EstagioModule } from "@/modules/estagio/estagio/estagio.module";
import { EstagioCandidaturaPermissionCheckerImpl } from "./application/authorization/estagio-candidatura-permission-checker";
import { CandidaturaAceitarCommandHandlerImpl } from "./application/commands/candidatura-aceitar.command.handler";
import { CandidaturaCancelarCommandHandlerImpl } from "./application/commands/candidatura-cancelar.command.handler";
import { CandidaturaConvocarCommandHandlerImpl } from "./application/commands/candidatura-convocar.command.handler";
import { CandidaturaCreateCommandHandlerImpl } from "./application/commands/candidatura-create.command.handler";
import { MinhasCandidaturasListQueryHandlerImpl } from "./application/queries/minhas-candidaturas-list.query.handler";
import { IEstagioCandidaturaPermissionChecker } from "./domain/authorization/estagio-candidatura-permission-checker.interface";
import { ICandidaturaAceitarCommandHandler } from "./domain/commands/candidatura-aceitar.command.handler.interface";
import { ICandidaturaCancelarCommandHandler } from "./domain/commands/candidatura-cancelar.command.handler.interface";
import { ICandidaturaConvocarCommandHandler } from "./domain/commands/candidatura-convocar.command.handler.interface";
import { ICandidaturaCreateCommandHandler } from "./domain/commands/candidatura-create.command.handler.interface";
import { IMinhasCandidaturasListQueryHandler } from "./domain/queries/minhas-candidaturas-list.query.handler.interface";
import { IEstagioCandidaturaRepository } from "./domain/repositories/estagio-candidatura.repository.interface";
import { EstagioCandidaturaTypeOrmRepositoryAdapter } from "./infrastructure.database/estagio-candidatura.repository";
import { EstagioCandidaturaRestController } from "./presentation.rest/estagio-candidatura.rest.controller";
import { MinhasCandidaturasRestController } from "./presentation.rest/minhas-candidaturas.rest.controller";

@Module({
  imports: [forwardRef(() => EstagioModule), EstagiarioModule, UsuarioModule, NotificacaoModule],
  controllers: [EstagioCandidaturaRestController, MinhasCandidaturasRestController],
  providers: [
    {
      provide: IEstagioCandidaturaRepository,
      useClass: EstagioCandidaturaTypeOrmRepositoryAdapter,
    },
    {
      provide: IEstagioCandidaturaPermissionChecker,
      useClass: EstagioCandidaturaPermissionCheckerImpl,
    },
    {
      provide: ICandidaturaCreateCommandHandler,
      useClass: CandidaturaCreateCommandHandlerImpl,
    },
    {
      provide: ICandidaturaCancelarCommandHandler,
      useClass: CandidaturaCancelarCommandHandlerImpl,
    },
    {
      provide: ICandidaturaConvocarCommandHandler,
      useClass: CandidaturaConvocarCommandHandlerImpl,
    },
    {
      provide: ICandidaturaAceitarCommandHandler,
      useClass: CandidaturaAceitarCommandHandlerImpl,
    },
    {
      provide: IMinhasCandidaturasListQueryHandler,
      useClass: MinhasCandidaturasListQueryHandlerImpl,
    },
  ],
  exports: [
    IEstagioCandidaturaRepository,
    IEstagioCandidaturaPermissionChecker,
    ICandidaturaCreateCommandHandler,
    ICandidaturaCancelarCommandHandler,
    ICandidaturaConvocarCommandHandler,
    ICandidaturaAceitarCommandHandler,
    IMinhasCandidaturasListQueryHandler,
  ],
})
export class EstagioCandidaturaModule {}
