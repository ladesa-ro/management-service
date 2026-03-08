import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { PerfilFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/PerfilFindOneInputDto";
import type { PerfilFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/PerfilFindOneOutputDto";

export interface IPerfilFindByIdQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: PerfilFindOneInputDto,
  ): Promise<PerfilFindOneOutputDto | null>;
}
