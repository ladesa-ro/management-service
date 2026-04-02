import type { IAccessContext } from "@/domain/abstractions";
import { IIdpUserService } from "@/domain/abstractions/identity-provider";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAutenticacaoRecoverPasswordCommandHandler } from "@/modules/acesso/autenticacao/domain/commands/autenticacao-recover-password.command.handler.interface";
import type { AuthRecoverPasswordCommand } from "@/modules/acesso/autenticacao/domain/commands/auth-recover-password.command";

@Impl()
export class AutenticacaoRecoverPasswordCommandHandlerImpl
  implements IAutenticacaoRecoverPasswordCommandHandler
{
  constructor(
    @Dep(IIdpUserService)
    private readonly idpUserService: IIdpUserService,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    dto: AuthRecoverPasswordCommand,
  ): Promise<boolean> {
    return this.idpUserService.sendPasswordResetEmail(dto.email);
  }
}
