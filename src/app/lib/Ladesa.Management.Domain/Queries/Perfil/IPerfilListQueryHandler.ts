import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { PerfilListInputDto } from "@/Ladesa.Management.Domain/Dtos/PerfilListInputDto";
import type { PerfilListOutputDto } from "@/Ladesa.Management.Domain/Dtos/PerfilListOutputDto";

export interface IPerfilListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: PerfilListInputDto | null,
  ): Promise<PerfilListOutputDto>;
}
