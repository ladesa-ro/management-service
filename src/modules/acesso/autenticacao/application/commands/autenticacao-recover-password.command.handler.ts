import { IIdpUserService } from "@/domain/abstractions/identity-provider";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAutenticacaoRecoverPasswordCommandHandler } from "@/modules/acesso/autenticacao/domain/commands/autenticacao-recover-password.command.handler.interface";
import type { AuthRecoverPasswordCommand } from "@/modules/acesso/autenticacao/domain/commands/auth-recover-password.command";
import type { AccessContext } from "@/server/access-context";

@DeclareImplementation()
export class AutenticacaoRecoverPasswordCommandHandlerImpl
  implements IAutenticacaoRecoverPasswordCommandHandler
{
  constructor(
    @DeclareDependency(IIdpUserService)
    private readonly idpUserService: IIdpUserService,
  ) {}

  async execute(
    _accessContext: AccessContext | null,
    dto: AuthRecoverPasswordCommand,
  ): Promise<boolean> {
    return this.idpUserService.sendPasswordResetEmail(dto.email);
  }
}
