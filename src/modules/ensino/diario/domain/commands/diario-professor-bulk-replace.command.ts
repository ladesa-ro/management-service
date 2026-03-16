export class DiarioProfessorBulkReplaceItem {
  perfilId!: string;
  situacao!: boolean;
}

export class DiarioProfessorBulkReplaceCommand {
  diarioId!: string;
  professores!: DiarioProfessorBulkReplaceItem[];
}
