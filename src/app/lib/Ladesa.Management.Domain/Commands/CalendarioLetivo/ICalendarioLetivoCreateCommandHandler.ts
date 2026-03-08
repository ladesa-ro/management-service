import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { CalendarioLetivoCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoCreateInputDto";
import type { CalendarioLetivoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoFindOneOutputDto";

export interface ICalendarioLetivoCreateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: CalendarioLetivoCreateInputDto,
  ): Promise<CalendarioLetivoFindOneOutputDto>;
}
