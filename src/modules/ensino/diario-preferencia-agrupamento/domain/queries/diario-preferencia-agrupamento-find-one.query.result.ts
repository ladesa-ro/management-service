import { EntityQueryResult } from "@/domain/abstractions";
import type { ScalarDate } from "@/modules/@shared";
import { DiarioFindOneQueryResult } from "@/modules/ensino/diario";

export class DiarioPreferenciaAgrupamentoFindOneQueryResult extends EntityQueryResult {
  dataInicio!: ScalarDate;
  dataFim!: ScalarDate | null;
  diaSemanaIso!: number;
  aulasSeguidas!: number;
  diario!: DiarioFindOneQueryResult;
}
