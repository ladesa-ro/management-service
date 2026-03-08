import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { CalendarioLetivoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoFindOneInputDto";

export interface ICalendarioLetivoDeleteCommandHandler {
  execute(accessContext: AccessContext, dto: CalendarioLetivoFindOneInputDto): Promise<boolean>;
}
