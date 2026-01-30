import type { IdUuid, ScalarDateTimeString } from "@/core/@shared";
import type { IUsuario } from "@/core/usuario/domain/usuario.types";

export interface IProfessorIndisponibilidade {
  id: IdUuid;
  perfil: IUsuario;
  diaDaSemana: number;
  horaInicio: string;
  horaFim: string;
  motivo: string;
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
}

export interface IProfessorIndisponibilidadeCreate {
  perfil: { id: IdUuid };
  diaDaSemana: number;
  horaInicio: string;
  horaFim: string;
  motivo: string;
}
