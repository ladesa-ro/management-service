import type { IdUuid, ScalarDateTimeString } from "@/core/@shared";
import type { IDiario } from "@/core/diario/domain/diario.types";
import type { IIntervaloDeTempo } from "@/core/intervalo-de-tempo/domain/intervalo-de-tempo.types";

export interface IDiarioPreferenciaAgrupamento {
  id: IdUuid;
  dataInicio: ScalarDateTimeString;
  dataFim: ScalarDateTimeString | null;
  diaSemanaIso: number;
  aulasSeguidas: number;
  intervaloDeTempo: IIntervaloDeTempo;
  diario: IDiario;
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
}

export interface IDiarioPreferenciaAgrupamentoCreate {
  dataInicio: ScalarDateTimeString;
  dataFim?: ScalarDateTimeString | null;
  diaSemanaIso: number;
  aulasSeguidas: number;
  intervaloDeTempo: { id: IdUuid };
  diario: { id: IdUuid };
}

export interface IDiarioPreferenciaAgrupamentoUpdate {
  dataInicio?: ScalarDateTimeString;
  dataFim?: ScalarDateTimeString | null;
  diaSemanaIso?: number;
  aulasSeguidas?: number;
  intervaloDeTempo?: { id: IdUuid };
  diario?: { id: IdUuid };
}
