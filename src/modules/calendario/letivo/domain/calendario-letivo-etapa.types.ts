import type { IVersioned } from "@/domain/abstractions";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";

export interface ICalendarioLetivoEtapa extends IVersioned {
  id: string;
  dataInicio: string;
  dataTermino: string;
  ofertaFormacaoPeriodoEtapa: { id: string; nome?: string };
  calendarioLetivo: { id: string };

  // Snapshot da etapa no momento da vinculação
  nome: string;
  cor: string | null;
  ordem: number;
  numeroPeriodo: number;

  // IVersioned
  identificadorExterno: IdUuid;
  version: number;
  previousVersionId: IdUuid | null;
  validFrom: ScalarDateTimeString;
  validTo: ScalarDateTimeString | null;

  dateCreated: string;
  dateUpdated: string;
  dateDeleted: string | null;
}
