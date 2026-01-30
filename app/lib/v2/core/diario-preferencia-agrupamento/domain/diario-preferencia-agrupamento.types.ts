import type { IDiario } from "@/core/diario/domain/diario.types";
import type { IIntervaloDeTempo } from "@/core/intervalo-de-tempo/domain/intervalo-de-tempo.types";

export interface IDiarioPreferenciaAgrupamento {
  id: string;
  dataInicio: Date;
  dataFim: Date | null;
  diaSemanaIso: number;
  aulasSeguidas: number;
  intervaloDeTempo: IIntervaloDeTempo;
  diario: IDiario;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

export interface IDiarioPreferenciaAgrupamentoCreate {
  dataInicio: Date;
  dataFim?: Date | null;
  diaSemanaIso: number;
  aulasSeguidas: number;
  intervaloDeTempo: { id: string };
  diario: { id: string };
}
