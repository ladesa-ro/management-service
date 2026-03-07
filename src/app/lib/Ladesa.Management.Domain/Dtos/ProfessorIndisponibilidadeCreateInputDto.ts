import type { UsuarioInputRefDto } from "./UsuarioInputRefDto";

export class ProfessorIndisponibilidadeCreateInputDto {
  perfil!: UsuarioInputRefDto;
  diaDaSemana!: number;
  horaInicio!: string;
  horaFim!: string;
  motivo!: string;
}
