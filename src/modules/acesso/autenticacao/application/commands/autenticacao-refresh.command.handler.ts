import { ForbiddenException } from "@nestjs/common";
import { IIdpTokenService } from "@/domain/abstractions/identity-provider";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IAutenticacaoRefreshCommand,
  IAutenticacaoRefreshCommandHandler,
} from "@/modules/acesso/autenticacao/domain/commands/autenticacao-refresh.command.handler.interface";
import type { AuthSessionCredentialsDto } from "../dtos";

@DeclareImplementation()
export class AutenticacaoRefreshCommandHandlerImpl implements IAutenticacaoRefreshCommandHandler {
  constructor(
    @DeclareDependency(IIdpTokenService)
    private readonly idpTokenService: IIdpTokenService,
  ) {}

  async execute({ dto }: IAutenticacaoRefreshCommand): Promise<AuthSessionCredentialsDto> {
    try {
      const refreshToken = dto.refreshToken;

      if (refreshToken) {
        const tokenset = await this.idpTokenService.refreshGrant(refreshToken);
        return tokenset as AuthSessionCredentialsDto;
      }
    } catch (_error) {}

    throw new ForbiddenException("Credenciais inválidas ou expiradas.");
  }
}
