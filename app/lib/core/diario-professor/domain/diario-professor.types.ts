import type { IdUuid, ScalarDateTimeString } from "@/core/@shared";
import type { IDiario } from "@/core/diario/domain/diario.types";
import type { IPerfil } from "@/core/perfil";

export interface IDiarioProfessor {
  id: IdUuid;
  situacao: boolean;
  diario: IDiario;
  perfil: IPerfil;
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
}

export interface IDiarioProfessorCreate {
  situacao: boolean;
  diario: { id: IdUuid };
  perfil: { id: IdUuid };
}

export interface IDiarioProfessorUpdate {
  situacao?: boolean;
  diario?: { id: IdUuid };
  perfil?: { id: IdUuid };
}
