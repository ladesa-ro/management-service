import type { IPerfil } from "@/core/perfil";
import type { IDiario } from "@/core/diario/domain/diario.types";

export interface IDiarioProfessor {
  id: string;
  situacao: boolean;
  diario: IDiario;
  perfil: IPerfil;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

export interface IDiarioProfessorCreate {
  situacao: boolean;
  diario: { id: string };
  perfil: { id: string };
}
