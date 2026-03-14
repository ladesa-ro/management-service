import { IIdpUserService } from "@/domain/abstractions/identity-provider";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IAutenticacaoRecoverPasswordCommand,
  IAutenticacaoRecoverPasswordCommandHandler,
} from "@/modules/acesso/autenticacao/domain/commands/autenticacao-recover-password.command.handler.interface";

@DeclareImplementation()
export class AutenticacaoRecoverPasswordCommandHandlerImpl
  implements IAutenticacaoRecoverPasswordCommandHandler
{
  constructor(
    @DeclareDependency(IIdpUserService)
    private readonly idpUserService: IIdpUserService,
  ) {}

  async execute({ dto }: IAutenticacaoRecoverPasswordCommand): Promise<boolean> {
    return this.idpUserService.sendPasswordResetEmail(dto.email);
  }
}
