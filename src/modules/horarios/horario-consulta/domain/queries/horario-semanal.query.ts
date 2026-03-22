import { createFieldMetadata } from "@/domain/abstractions";

export const HorarioSemanalQueryFields = {
  semana: createFieldMetadata({
    description:
      "Data da semana desejada (YYYY-MM-DD). Qualquer dia da semana; a API calcula seg-dom.",
  }),
  turmaIds: createFieldMetadata({
    description: "IDs das turmas, separados por virgula",
  }),
  professorIds: createFieldMetadata({
    description: "IDs dos professores (perfil), separados por virgula",
  }),
};

export class HorarioSemanalQuery {
  /** ISO date (YYYY-MM-DD) representing the Monday of the desired week */
  semana!: string;
}

export class TurmaHorarioSemanalQuery extends HorarioSemanalQuery {
  turmaId!: string;
}

export class UsuarioHorarioSemanalQuery extends HorarioSemanalQuery {
  usuarioId!: string;
}

export class HorarioMescladoQuery extends HorarioSemanalQuery {
  /** Comma-separated turma IDs */
  turmaIds!: string[];
  /** Optional professor (perfil) IDs */
  professorIds?: string[];
}
