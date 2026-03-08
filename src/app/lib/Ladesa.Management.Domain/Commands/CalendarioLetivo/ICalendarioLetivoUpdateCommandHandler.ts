import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { CalendarioLetivoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoFindOneInputDto";
import type { CalendarioLetivoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoFindOneOutputDto";
import type { CalendarioLetivoUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoUpdateInputDto";

export interface ICalendarioLetivoUpdateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInputDto & CalendarioLetivoUpdateInputDto,
  ): Promise<CalendarioLetivoFindOneOutputDto>;
}
