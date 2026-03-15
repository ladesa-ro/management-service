import { ForbiddenException } from "@nestjs/common";
import { IIdpTokenService } from "@/domain/abstractions/identity-provider";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { IAutenticacaoRefreshCommandHandler } from "@/modules/acesso/autenticacao/domain/commands/autenticacao-refresh.command.handler.interface";
import type { AuthRefreshCommand } from "@/modules/acesso/autenticacao/domain/commands/auth-refresh.command";
import type { AuthSessionCredentials } from "../../domain/shared";

@DeclareImplementation()
export class AutenticacaoRefreshCommandHandlerImpl implements IAutenticacaoRefreshCommandHandler {
  constructor(
    @DeclareDependency(IIdpTokenService)
    private readonly idpTokenService: IIdpTokenService,
  ) {}

  async execute(
    _accessContext: AccessContext | null,
    dto: AuthRefreshCommand,
  ): Promise<AuthSessionCredentials> {
    try {
      const refreshToken = dto.refreshToken;

      if (refreshToken) {
        const tokenset = await this.idpTokenService.refreshGrant(refreshToken);
        return tokenset as AuthSessionCredentials;
      }
    } catch (_error) {}

    throw new ForbiddenException("Credenciais inválidas ou expiradas.");
  }
}
