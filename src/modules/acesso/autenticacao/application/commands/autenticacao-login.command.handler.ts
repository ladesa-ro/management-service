import { ForbiddenError, ValidationError } from "@/application/errors";
import { IIdpTokenService, IIdpUserService } from "@/domain/abstractions/identity-provider";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAutenticacaoLoginCommandHandler } from "@/modules/acesso/autenticacao/domain/commands/autenticacao-login.command.handler.interface";
import type { AuthLoginCommand } from "@/modules/acesso/autenticacao/domain/commands/auth-login.command";
import { IUsuarioFindByMatriculaQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-find-by-matricula.query.handler.interface";
import type { AccessContext } from "@/server/access-context";
import type { AuthSessionCredentials } from "../../domain/shared";

@DeclareImplementation()
export class AutenticacaoLoginCommandHandlerImpl implements IAutenticacaoLoginCommandHandler {
  constructor(
    @DeclareDependency(IUsuarioFindByMatriculaQueryHandler)
    private readonly usuarioFindByMatriculaHandler: IUsuarioFindByMatriculaQueryHandler,
    @DeclareDependency(IIdpUserService)
    private readonly idpUserService: IIdpUserService,
    @DeclareDependency(IIdpTokenService)
    private readonly idpTokenService: IIdpTokenService,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: AuthLoginCommand,
  ): Promise<AuthSessionCredentials> {
    if (accessContext?.requestActor !== null) {
      throw new ValidationError([], "Você não pode usar a rota de login caso já esteja logado.");
    }

    const usuario = await this.usuarioFindByMatriculaHandler.execute(null, {
      matricula: dto.matricula,
    });
    const username = await this.idpUserService.resolveUsernameByMatricula(dto.matricula);

    try {
      if (usuario && username) {
        const tokenset = await this.idpTokenService.passwordGrant(username, dto.senha);

        return tokenset as AuthSessionCredentials;
      }
    } catch (_error) {}

    throw new ForbiddenError("Credenciais inválidas.");
  }
}
