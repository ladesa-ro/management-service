import type { IVersioned } from "@/domain/abstractions";

export interface ICalendarioLetivoEtapa extends IVersioned {
  id: string;
  dataInicio: string;
  dataTermino: string;
  ofertaFormacaoPeriodoEtapa: { id: string; nome?: string };
  calendarioLetivo: { id: string };

  // Snapshot da etapa no momento da vinculacao
  nome: string;
  cor: string;
  ordem: number;
  numeroPeriodo: number;

  dateCreated: string;
  dateUpdated: string;
  dateDeleted: string | null;
}
