import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IBaseCrudRepository } from "@/modules/@shared";
import type { ICalendarioLetivoDia } from "../calendario-letivo-dia";
import type { CalendarioLetivoDiaFindOneQueryResult, CalendarioLetivoDiaListQueryResult } from "../queries";

export const ICalendarioLetivoDiaRepository = Symbol("ICalendarioLetivoDiaRepository");

export interface ICalendarioLetivoDiaRepository
  extends IBaseCrudRepository<
    ICalendarioLetivoDia,
    CalendarioLetivoDiaListQueryResult,
    CalendarioLetivoDiaFindOneQueryResult
  > {
  findByCalendarioAndDate(
    accessContext: AccessContext | null,
    calendarioLetivoId: string,
    data: string,
    selection?: string[],
  ): Promise<CalendarioLetivoDiaFindOneQueryResult | null>;

  findByIdSimple(
    accessContext: AccessContext | null,
    id: string,
    selection?: string[],
  ): Promise<CalendarioLetivoDiaFindOneQueryResult | null>;
}
