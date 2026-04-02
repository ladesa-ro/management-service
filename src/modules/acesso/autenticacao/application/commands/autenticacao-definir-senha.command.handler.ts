import { ApplicationError, ForbiddenError, ServiceUnavailableError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { IIdpUserService } from "@/domain/abstractions/identity-provider";
import { ILoggerPort, ILoggerPort as ILoggerPortToken } from "@/domain/abstractions/logging";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAutenticacaoDefinirSenhaCommandHandler } from "@/modules/acesso/autenticacao/domain/commands/autenticacao-definir-senha.command.handler.interface";
import type { AuthCredentialsSetInitialPasswordCommand } from "@/modules/acesso/autenticacao/domain/commands/auth-credentials-set-initial-password.command";
import { IUsuarioFindByMatriculaQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-find-by-matricula.query.handler.interface";

@Impl()
export class AutenticacaoDefinirSenhaCommandHandlerImpl
  implements IAutenticacaoDefinirSenhaCommandHandler
{
  constructor(
    @Dep(IUsuarioFindByMatriculaQueryHandler)
    private readonly usuarioFindByMatriculaHandler: IUsuarioFindByMatriculaQueryHandler,
    @Dep(IIdpUserService)
    private readonly idpUserService: IIdpUserService,
    @Dep(ILoggerPortToken)
    private readonly logger: ILoggerPort,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    dto: AuthCredentialsSetInitialPasswordCommand,
  ): Promise<boolean> {
    try {
      const usuario = await this.usuarioFindByMatriculaHandler.execute(null, {
        matricula: dto.matricula,
      });
      const exists = await this.idpUserService.existsByMatricula(dto.matricula);

      if (!usuario || !exists) {
        throw new ForbiddenError("Usuário indisponível.");
      }

      const canSet = await this.idpUserService.canSetInitialPassword(dto.matricula);

      if (!canSet) {
        throw new ForbiddenError("A senha do usuário já foi definida.");
      }

      await this.idpUserService.setInitialPassword(dto.matricula, dto.senha);

      return true;
    } catch (error) {
      if (error instanceof ApplicationError) {
        throw error;
      }

      this.logger.debug(String(error), "AutenticacaoDefinirSenhaCommandHandler");

      throw new ServiceUnavailableError();
    }
  }
}
