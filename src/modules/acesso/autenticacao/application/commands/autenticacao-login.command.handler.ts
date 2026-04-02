import { ForbiddenError, ValidationError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { IIdpTokenService, IIdpUserService } from "@/domain/abstractions/identity-provider";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAutenticacaoLoginCommandHandler } from "@/modules/acesso/autenticacao/domain/commands/autenticacao-login.command.handler.interface";
import type { AuthLoginCommand } from "@/modules/acesso/autenticacao/domain/commands/auth-login.command";
import { IUsuarioFindByMatriculaQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-find-by-matricula.query.handler.interface";
import type { AuthSessionCredentials } from "../../domain/shared";

@Impl()
export class AutenticacaoLoginCommandHandlerImpl implements IAutenticacaoLoginCommandHandler {
  constructor(
    @Dep(IUsuarioFindByMatriculaQueryHandler)
    private readonly usuarioFindByMatriculaHandler: IUsuarioFindByMatriculaQueryHandler,
    @Dep(IIdpUserService)
    private readonly idpUserService: IIdpUserService,
    @Dep(IIdpTokenService)
    private readonly idpTokenService: IIdpTokenService,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
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
