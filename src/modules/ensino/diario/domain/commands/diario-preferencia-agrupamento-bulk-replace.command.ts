import { createFieldMetadata } from "@/domain/abstractions";
import type { ScalarDate } from "@/domain/abstractions/scalars";
import { DiarioPreferenciaAgrupamentoFields } from "../diario-preferencia-agrupamento.fields";

export const DiarioPreferenciaAgrupamentoBulkReplaceCommandFields = {
  diarioId: createFieldMetadata({ description: "ID do diario (uuid)" }),
  preferenciasAgrupamento: createFieldMetadata({
    description: "Lista de preferencias de agrupamento para vincular ao diario",
  }),
  modo: DiarioPreferenciaAgrupamentoFields.modo,
  ordem: DiarioPreferenciaAgrupamentoFields.ordem,
  dataInicio: DiarioPreferenciaAgrupamentoFields.dataInicio,
  dataFim: DiarioPreferenciaAgrupamentoFields.dataFim,
  diaSemanaIso: DiarioPreferenciaAgrupamentoFields.diaSemanaIso,
  aulasSeguidas: DiarioPreferenciaAgrupamentoFields.aulasSeguidas,
};

export class DiarioPreferenciaAgrupamentoBulkReplaceItem {
  modo!: string;
  ordem!: number;
  dataInicio!: ScalarDate;
  dataFim!: ScalarDate | null;
  diaSemanaIso!: number | null;
  aulasSeguidas!: number;
}

export class DiarioPreferenciaAgrupamentoBulkReplaceCommand {
  diarioId!: string;
  preferenciasAgrupamento!: DiarioPreferenciaAgrupamentoBulkReplaceItem[];
}
