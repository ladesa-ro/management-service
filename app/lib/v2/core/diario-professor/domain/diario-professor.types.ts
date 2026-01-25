import type { IDiario } from "@/v2/core/diario/domain/diario.types";
import type { IPerfil } from "@/v2/core/perfil/domain/perfil.types";

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
