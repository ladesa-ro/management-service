import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type Disponibilidade } from "@/Ladesa.Management.Domain/Entities/Disponibilidade";
import { type Turma } from "@/Ladesa.Management.Domain/Entities/Turma";

export interface TurmaDisponibilidadeCreateDto {
  turma: IFindOneByIdDto<Turma["id"]>;
  disponibilidade: IFindOneByIdDto<Disponibilidade["id"]>;
}
