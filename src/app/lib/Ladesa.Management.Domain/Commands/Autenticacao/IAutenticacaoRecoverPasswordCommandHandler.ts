import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { AuthRecoverPasswordInputDto } from "@/Ladesa.Management.Domain/Dtos/AuthRecoverPasswordInputDto";

export interface IAutenticacaoRecoverPasswordCommandHandler {
  execute(
    accessContext: AccessContext | null,
    domain: AuthRecoverPasswordInputDto,
  ): Promise<boolean>;
}
