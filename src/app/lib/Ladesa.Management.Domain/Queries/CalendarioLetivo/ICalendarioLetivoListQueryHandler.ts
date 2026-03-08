import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { CalendarioLetivoListInputDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoListInputDto";
import type { CalendarioLetivoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoListOutputDto";

export interface ICalendarioLetivoListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: CalendarioLetivoListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoListOutputDto>;
}
