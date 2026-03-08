import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { AmbienteListInputDto } from "@/Ladesa.Management.Domain/Dtos/AmbienteListInputDto";
import type { AmbienteListOutputDto } from "@/Ladesa.Management.Domain/Dtos/AmbienteListOutputDto";

export interface IAmbienteListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: AmbienteListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<AmbienteListOutputDto>;
}
