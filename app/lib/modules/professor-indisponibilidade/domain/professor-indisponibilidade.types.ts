import type { IdUuid, ScalarDateTimeString } from "@/modules/@shared";
import type { IUsuario } from "@/modules/usuario/domain/usuario.types";

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

export interface IProfessorIndisponibilidadeUpdate {
  perfil?: { id: IdUuid };
  diaDaSemana?: number;
  horaInicio?: string;
  horaFim?: string;
  motivo?: string;
}
