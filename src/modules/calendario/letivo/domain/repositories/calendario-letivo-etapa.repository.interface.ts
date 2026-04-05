import type { ICalendarioLetivoEtapa } from "../calendario-letivo-etapa.types";

export const ICalendarioLetivoEtapaRepository = Symbol("ICalendarioLetivoEtapaRepository");

export interface IOfertaFormacaoPeriodoEtapaSnapshot {
  nome: string;
  cor: string;
  ordem: number;
  numeroPeriodo: number;
}

export interface ICalendarioLetivoEtapaRepository {
  findByCalendarioLetivoId(calendarioLetivoId: string): Promise<ICalendarioLetivoEtapa[]>;
  findByCalendarioLetivoIds(calendarioLetivoIds: string[]): Promise<ICalendarioLetivoEtapa[]>;
  findOfertaFormacaoPeriodoEtapaSnapshot(
    id: string,
  ): Promise<IOfertaFormacaoPeriodoEtapaSnapshot | null>;
  softDeleteByCalendarioLetivoId(calendarioLetivoId: string): Promise<void>;
  save(entity: Partial<ICalendarioLetivoEtapa>): Promise<ICalendarioLetivoEtapa>;
}
