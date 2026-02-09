import type { IdUuid, IEntityBase } from "@/modules/@shared";
import type { IUsuario } from "@/modules/usuario/domain/usuario.types";

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
