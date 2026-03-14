import type { IdUuid, IEntityBase, ScalarDateTimeString } from "@/modules/@shared";
import type { IDiario } from "@/modules/ensino/diario/domain/diario.types";

export interface IDiarioPreferenciaAgrupamento extends IEntityBase {
  dataInicio: ScalarDateTimeString;
  dataFim: ScalarDateTimeString | null;
  diaSemanaIso: number;
  aulasSeguidas: number;
  diario: IDiario;
}

export interface IDiarioPreferenciaAgrupamentoCreate {
  dataInicio: ScalarDateTimeString;
  dataFim?: ScalarDateTimeString | null;
  diaSemanaIso: number;
  aulasSeguidas: number;
  diario: { id: IdUuid };
}

export interface IDiarioPreferenciaAgrupamentoUpdate {
  dataInicio?: ScalarDateTimeString;
  dataFim?: ScalarDateTimeString | null;
  diaSemanaIso?: number;
  aulasSeguidas?: number;
  diario?: { id: IdUuid };
}
