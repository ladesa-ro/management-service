import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { EstadoListInputDto } from "@/Ladesa.Management.Domain/Dtos/EstadoListInputDto";
import type { EstadoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/EstadoListOutputDto";

export interface IEstadoListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: EstadoListInputDto | null,
  ): Promise<EstadoListOutputDto>;
}
