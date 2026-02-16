import type { IUsuario } from "@/modules/@acesso/usuario/domain/usuario.types";
import type { IdUuid, IEntityBase } from "@/modules/@shared";

export interface IProfessorIndisponibilidade extends IEntityBase {
  perfil: IUsuario;
  diaDaSemana: number;
  horaInicio: string;
  horaFim: string;
  motivo: string;
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
