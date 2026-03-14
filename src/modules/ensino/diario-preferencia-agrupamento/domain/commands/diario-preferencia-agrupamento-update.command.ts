import type { ScalarDate } from "@/modules/@shared";
import { DiarioInputRef } from "@/modules/ensino/diario";

export class DiarioPreferenciaAgrupamentoUpdateCommand {
  dataInicio?: ScalarDate;
  dataFim?: ScalarDate | null;
  diaSemanaIso?: number;
  aulasSeguidas?: number;
  diario?: DiarioInputRef;
}
