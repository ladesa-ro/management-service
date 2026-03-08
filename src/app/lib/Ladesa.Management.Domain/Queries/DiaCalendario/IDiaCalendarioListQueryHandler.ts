import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { DiaCalendarioListInputDto } from "@/Ladesa.Management.Domain/Dtos/DiaCalendarioListInputDto";
import type { DiaCalendarioListOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiaCalendarioListOutputDto";

export interface IDiaCalendarioListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: DiaCalendarioListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioListOutputDto>;
}
