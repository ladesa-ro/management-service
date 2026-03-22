import { createFieldMetadata } from "@/domain/abstractions";
import { DiarioProfessorFields } from "../diario-professor.fields";

export const DiarioProfessorBulkReplaceCommandFields = {
  diarioId: createFieldMetadata({ description: "ID do diario (uuid)" }),
  professores: createFieldMetadata({ description: "Lista de professores para vincular ao diario" }),
  perfilId: createFieldMetadata({ description: "ID do perfil (uuid)" }),
  situacao: DiarioProfessorFields.situacao,
};

export class DiarioProfessorBulkReplaceItem {
  perfilId!: string;
  situacao!: boolean;
}

export class DiarioProfessorBulkReplaceCommand {
  diarioId!: string;
  professores!: DiarioProfessorBulkReplaceItem[];
}
