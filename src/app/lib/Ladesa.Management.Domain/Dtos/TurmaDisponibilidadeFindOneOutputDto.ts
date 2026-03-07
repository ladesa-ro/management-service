import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import { DisponibilidadeFindOneOutputDto } from "./DisponibilidadeFindOneOutputDto";
import { TurmaFindOneOutputDto } from "./TurmaFindOneOutputDto";

export class TurmaDisponibilidadeFindOneOutputDto extends EntityOutputDto {
  turma!: TurmaFindOneOutputDto;
  disponibilidade!: DisponibilidadeFindOneOutputDto;
}
