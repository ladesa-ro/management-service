import type { ICalendarioLetivoEtapa } from "../calendario-letivo-etapa.types";

export const ICalendarioLetivoEtapaRepository = Symbol("ICalendarioLetivoEtapaRepository");

export interface ICalendarioLetivoEtapaRepository {
  findByCalendarioLetivoId(calendarioLetivoId: string): Promise<ICalendarioLetivoEtapa[]>;
  softDeleteByCalendarioLetivoId(calendarioLetivoId: string): Promise<void>;
  save(entity: Partial<ICalendarioLetivoEtapa>): Promise<ICalendarioLetivoEtapa>;
}
