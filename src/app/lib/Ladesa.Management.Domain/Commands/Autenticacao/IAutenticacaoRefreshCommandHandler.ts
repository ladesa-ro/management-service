import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { AuthRefreshInputDto } from "@/Ladesa.Management.Domain/Dtos/AuthRefreshInputDto";
import type { AuthSessionCredentialsDto } from "@/Ladesa.Management.Domain/Dtos/AuthSessionCredentialsDto";

export interface IAutenticacaoRefreshCommandHandler {
  execute(
    accessContext: AccessContext,
    domain: AuthRefreshInputDto,
  ): Promise<AuthSessionCredentialsDto>;
}
