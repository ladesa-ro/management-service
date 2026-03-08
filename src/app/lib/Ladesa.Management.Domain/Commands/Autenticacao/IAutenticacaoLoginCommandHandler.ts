import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { AuthLoginInputDto } from "@/Ladesa.Management.Domain/Dtos/AuthLoginInputDto";
import type { AuthSessionCredentialsDto } from "@/Ladesa.Management.Domain/Dtos/AuthSessionCredentialsDto";

export interface IAutenticacaoLoginCommandHandler {
  execute(
    accessContext: AccessContext,
    domain: AuthLoginInputDto,
  ): Promise<AuthSessionCredentialsDto>;
}
