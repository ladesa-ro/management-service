import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type Perfil } from "@/Ladesa.Management.Domain/Entities/Perfil";

export interface ProfessorIndisponibilidadeCreateDto {
  perfil: IFindOneByIdDto<Perfil["id"]>;
  diaDaSemana: number;
  horaInicio: string;
  horaFim: string;
  motivo: string;
}
