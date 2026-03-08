import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { AuthCredentialsSetInitialPasswordInputDto } from "@/Ladesa.Management.Domain/Dtos/AuthCredentialsSetInitialPasswordInputDto";

export interface IAutenticacaoDefinirSenhaCommandHandler {
  execute(
    accessContext: AccessContext,
    domain: AuthCredentialsSetInitialPasswordInputDto,
  ): Promise<boolean>;
}
