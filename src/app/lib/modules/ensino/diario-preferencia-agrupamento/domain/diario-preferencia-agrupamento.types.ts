import type { IdUuid, IEntityBase, ScalarDateTimeString } from "@/modules/@shared";
import type { IDiario } from "@/modules/ensino/diario/domain/diario.types";
import type { IIntervaloDeTempo } from "@/modules/horarios/intervalo-de-tempo/domain/intervalo-de-tempo.types";

export interface IDiarioPreferenciaAgrupamento extends IEntityBase {
  dataInicio: ScalarDateTimeString;
  dataFim: ScalarDateTimeString | null;
  diaSemanaIso: number;
  aulasSeguidas: number;
  intervaloDeTempo: IIntervaloDeTempo;
  diario: IDiario;
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
