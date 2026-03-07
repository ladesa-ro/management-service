import type { UsuarioInputRefDto } from "./UsuarioInputRefDto";

export class ProfessorIndisponibilidadeUpdateInputDto {
  perfil?: UsuarioInputRefDto;
  diaDaSemana?: number;
  horaInicio?: string;
  horaFim?: string;
  motivo?: string;
}
