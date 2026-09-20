import { UnauthorizedError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { IIdpTokenService } from "@/domain/abstractions/identity-provider";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { IRuntimeOptions } from "@/infrastructure.config/options/runtime/runtime-options.interface";
import { IRuntimeOptions as IRuntimeOptionsToken } from "@/infrastructure.config/options/runtime/runtime-options.interface";
import { IAutenticacaoRefreshCommandHandler } from "@/modules/acesso/autenticacao/domain/commands/autenticacao-refresh.command.handler.interface";
import type { AuthRefreshCommand } from "@/modules/acesso/autenticacao/domain/commands/auth-refresh.command";
import { getNowTime } from "@/utils/date";
import type { AuthSessionCredentials } from "../../domain/shared";

@Impl()
export class AutenticacaoRefreshCommandHandlerImpl implements IAutenticacaoRefreshCommandHandler {
  constructor(
    @Dep(IIdpTokenService)
    private readonly idpTokenService: IIdpTokenService,
    @Dep(IRuntimeOptionsToken)
    private readonly runtimeOptions: IRuntimeOptions,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    dto: AuthRefreshCommand,
  ): Promise<AuthSessionCredentials> {
    const refreshToken = dto.refreshToken?.trim();

    if (!refreshToken) {
      throw new UnauthorizedError("Token de refresh não informado.");
    }

    if (this.runtimeOptions.enableMockAccessToken) {
      const mockMatch = refreshToken.match(/^mock\.refresh\.(\d+)$/);
      if (mockMatch) {
        const matricula = mockMatch[1];
        const expiresIn = 3600;
        return {
          access_token: `mock.matricula.${matricula}`,
          token_type: "Bearer",
          id_token: null,
          refresh_token: `mock.refresh.${matricula}`,
          expires_in: expiresIn,
          expires_at: getNowTime() + expiresIn * 1000,
          session_state: null,
          scope: "openid profile",
        };
      }
    }

    try {
      const refreshToken = dto.refreshToken;

      if (refreshToken) {
        const tokenset = await this.idpTokenService.refreshGrant(refreshToken);
        if (tokenset && tokenset.access_token) {
          return tokenset as AuthSessionCredentials;
        }
      }
    } catch (_error) {}

    throw new UnauthorizedError("Credenciais inválidas ou expiradas.");
  }
}
