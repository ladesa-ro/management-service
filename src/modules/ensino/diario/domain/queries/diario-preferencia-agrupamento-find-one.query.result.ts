import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import type { ScalarDate } from "@/domain/abstractions/scalars";
import { DiarioFindOneQueryResult } from "@/modules/ensino/diario";
import { DiarioPreferenciaAgrupamentoFields } from "../diario-preferencia-agrupamento.fields";

export const DiarioPreferenciaAgrupamentoFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...DiarioPreferenciaAgrupamentoFields,
};

export class DiarioPreferenciaAgrupamentoFindOneQueryResult extends EntityQueryResult {
  modo!: string;
  ordem!: number;
  dataInicio!: ScalarDate;
  dataFim!: ScalarDate | null;
  diaSemanaIso!: number | null;
  aulasSeguidas!: number;
  diario!: DiarioFindOneQueryResult;
}
