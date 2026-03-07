import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import { UsuarioFindOneOutputDto } from "./UsuarioFindOneOutputDto";

export class ProfessorIndisponibilidadeFindOneOutputDto extends EntityOutputDto {
  perfil!: UsuarioFindOneOutputDto;
  diaDaSemana!: number;
  horaInicio!: string;
  horaFim!: string;
  motivo!: string;
}
