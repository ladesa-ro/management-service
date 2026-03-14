import type { ScalarDate } from "@/modules/@shared";
import { DiarioInputRef } from "@/modules/ensino/diario";

export class DiarioPreferenciaAgrupamentoCreateCommand {
  dataInicio!: ScalarDate;
  dataFim?: ScalarDate | null;
  diaSemanaIso!: number;
  aulasSeguidas!: number;
  diario!: DiarioInputRef;
}
