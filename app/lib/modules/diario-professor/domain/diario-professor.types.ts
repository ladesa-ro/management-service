import type { IdUuid, IEntityBase } from "@/modules/@shared";
import type { IDiario } from "@/modules/diario/domain/diario.types";
import type { IPerfil } from "@/modules/perfil";

export interface IDiarioProfessor extends IEntityBase {
  situacao: boolean;
  diario: IDiario;
  perfil: IPerfil;
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
