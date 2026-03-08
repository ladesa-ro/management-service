import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { CalendarioLetivoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoFindOneInputDto";
import type { CalendarioLetivoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoFindOneOutputDto";

export interface ICalendarioLetivoFindByIdQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutputDto | null>;
}
