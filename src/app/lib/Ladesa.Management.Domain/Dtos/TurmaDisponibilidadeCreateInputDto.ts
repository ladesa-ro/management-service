import type { DisponibilidadeInputRefDto } from "./DisponibilidadeInputRefDto";
import type { TurmaInputRefDto } from "./TurmaInputRefDto";

export class TurmaDisponibilidadeCreateInputDto {
  turma!: TurmaInputRefDto;
  disponibilidade!: DisponibilidadeInputRefDto;
}
