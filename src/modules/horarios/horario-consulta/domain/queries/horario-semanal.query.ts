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
