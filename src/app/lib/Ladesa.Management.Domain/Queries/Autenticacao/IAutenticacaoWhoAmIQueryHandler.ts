import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { AuthWhoAmIOutputDto } from "@/Ladesa.Management.Domain/Dtos/AuthWhoAmIOutputDto";

export interface IAutenticacaoWhoAmIQueryHandler {
  execute(accessContext: AccessContext): Promise<AuthWhoAmIOutputDto>;
}
