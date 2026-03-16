import type { ScalarDate } from "@/domain/abstractions/scalars";

export class DiarioPreferenciaAgrupamentoBulkReplaceItem {
  dataInicio!: ScalarDate;
  dataFim!: ScalarDate | null;
  diaSemanaIso!: number;
  aulasSeguidas!: number;
}

export class DiarioPreferenciaAgrupamentoBulkReplaceCommand {
  diarioId!: string;
  preferenciasAgrupamento!: DiarioPreferenciaAgrupamentoBulkReplaceItem[];
}
