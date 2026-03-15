import { ForbiddenException, HttpException, ServiceUnavailableException } from "@nestjs/common";
import { IIdpUserService } from "@/domain/abstractions/identity-provider";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { IAutenticacaoDefinirSenhaCommandHandler } from "@/modules/acesso/autenticacao/domain/commands/autenticacao-definir-senha.command.handler.interface";
import type { AuthCredentialsSetInitialPasswordCommand } from "@/modules/acesso/autenticacao/domain/commands/auth-credentials-set-initial-password.command";
import { IUsuarioFindByMatriculaQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-find-by-matricula.query.handler.interface";

@DeclareImplementation()
export class AutenticacaoDefinirSenhaCommandHandlerImpl
  implements IAutenticacaoDefinirSenhaCommandHandler
{
  constructor(
    @DeclareDependency(IUsuarioFindByMatriculaQueryHandler)
    private readonly usuarioFindByMatriculaHandler: IUsuarioFindByMatriculaQueryHandler,
    @DeclareDependency(IIdpUserService)
    private readonly idpUserService: IIdpUserService,
  ) {}

  async execute(
    _accessContext: AccessContext | null,
    dto: AuthCredentialsSetInitialPasswordCommand,
  ): Promise<boolean> {
    try {
      const usuario = await this.usuarioFindByMatriculaHandler.execute(null, {
        matricula: dto.matricula,
      });
      const exists = await this.idpUserService.existsByMatricula(dto.matricula);

      if (!usuario || !exists) {
        throw new ForbiddenException("Usuário indisponível.");
      }

      const canSet = await this.idpUserService.canSetInitialPassword(dto.matricula);

      if (!canSet) {
        throw new ForbiddenException("A senha do usuário já foi definida.");
      }

      await this.idpUserService.setInitialPassword(dto.matricula, dto.senha);

      return true;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.debug("AutenticacaoDefinirSenhaCommandHandler#execute::err", error);

      throw new ServiceUnavailableException();
    }
  }
}
