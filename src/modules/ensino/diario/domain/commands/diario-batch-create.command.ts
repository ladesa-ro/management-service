import { createFieldMetadata } from "@/domain/abstractions";
import type { ScalarDate } from "@/domain/abstractions/scalars";
import { DiarioFields } from "../diario.fields";
import { DiarioPreferenciaAgrupamentoFields } from "../diario-preferencia-agrupamento.fields";

export const DiarioBatchCreateCommandFields = {
  turma: DiarioFields.turma,
  calendarioLetivo: DiarioFields.calendarioLetivo,
  diarios: createFieldMetadata({
    description: "Lista de diarios a serem criados em lote",
  }),
  disciplina: DiarioFields.disciplina,
  ativo: DiarioFields.ativo,
  professores: createFieldMetadata({
    description: "Lista de professores para vincular ao diario",
  }),
  perfilId: createFieldMetadata({ description: "ID do perfil (uuid)" }),
  situacao: createFieldMetadata({ description: "Situacao do vinculo professor-diario" }),
  preferenciasAgrupamento: createFieldMetadata({
    description: "Lista de preferencias de agrupamento para o diario",
  }),
  modo: DiarioPreferenciaAgrupamentoFields.modo,
  ordem: DiarioPreferenciaAgrupamentoFields.ordem,
  dataInicio: DiarioPreferenciaAgrupamentoFields.dataInicio,
  dataFim: DiarioPreferenciaAgrupamentoFields.dataFim,
  diaSemanaIso: DiarioPreferenciaAgrupamentoFields.diaSemanaIso,
  aulasSeguidas: DiarioPreferenciaAgrupamentoFields.aulasSeguidas,
};

export class DiarioBatchCreatePreferenciaAgrupamentoItem {
  modo!: string;
  ordem!: number;
  dataInicio!: ScalarDate;
  dataFim!: ScalarDate | null;
  diaSemanaIso!: number | null;
  aulasSeguidas!: number;
}

export class DiarioBatchCreateProfessorItem {
  perfilId!: string;
  situacao!: boolean;
}

export class DiarioBatchCreateDiarioItem {
  disciplina!: { id: string };
  ativo!: boolean;
  professores!: DiarioBatchCreateProfessorItem[];
  preferenciasAgrupamento!: DiarioBatchCreatePreferenciaAgrupamentoItem[];
}

export class DiarioBatchCreateCommand {
  turma!: { id: string };
  calendarioLetivo!: { id: string };
  diarios!: DiarioBatchCreateDiarioItem[];
}
