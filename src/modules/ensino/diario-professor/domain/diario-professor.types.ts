import type { IdUuid, IEntityBase } from "@/modules/@shared";
import type { IPerfil } from "@/modules/acesso/perfil";
import type { IDiario } from "@/modules/ensino/diario/domain/diario.types";

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
