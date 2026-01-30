import type { IUsuario } from "@/core/usuario/domain/usuario.types";

export interface IProfessorIndisponibilidade {
  id: string;
  perfil: IUsuario;
  diaDaSemana: number;
  horaInicio: string;
  horaFim: string;
  motivo: string;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

export interface IProfessorIndisponibilidadeCreate {
  perfil: { id: string };
  diaDaSemana: number;
  horaInicio: string;
  horaFim: string;
  motivo: string;
}
