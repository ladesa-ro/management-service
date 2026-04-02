import { ForbiddenError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { IIdpTokenService } from "@/domain/abstractions/identity-provider";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAutenticacaoRefreshCommandHandler } from "@/modules/acesso/autenticacao/domain/commands/autenticacao-refresh.command.handler.interface";
import type { AuthRefreshCommand } from "@/modules/acesso/autenticacao/domain/commands/auth-refresh.command";
import type { AuthSessionCredentials } from "../../domain/shared";

@Impl()
export class AutenticacaoRefreshCommandHandlerImpl implements IAutenticacaoRefreshCommandHandler {
  constructor(
    @Dep(IIdpTokenService)
    private readonly idpTokenService: IIdpTokenService,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    dto: AuthRefreshCommand,
  ): Promise<AuthSessionCredentials> {
    try {
      const refreshToken = dto.refreshToken;

      if (refreshToken) {
        const tokenset = await this.idpTokenService.refreshGrant(refreshToken);
        return tokenset as AuthSessionCredentials;
      }
    } catch (_error) {}

    throw new ForbiddenError("Credenciais inválidas ou expiradas.");
  }
}
