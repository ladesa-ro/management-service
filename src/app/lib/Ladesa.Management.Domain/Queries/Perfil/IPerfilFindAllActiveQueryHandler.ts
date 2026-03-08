import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { PerfilFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/PerfilFindOneOutputDto";

export interface IPerfilFindAllActiveQueryHandler {
  execute(
    accessContext: AccessContext | null,
    usuarioId: string,
  ): Promise<PerfilFindOneOutputDto[]>;
}
