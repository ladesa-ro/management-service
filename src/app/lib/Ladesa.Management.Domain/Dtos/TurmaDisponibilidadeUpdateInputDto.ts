import type { DisponibilidadeInputRefDto } from "./DisponibilidadeInputRefDto";
import type { TurmaInputRefDto } from "./TurmaInputRefDto";

export class TurmaDisponibilidadeUpdateInputDto {
  turma?: TurmaInputRefDto;
  disponibilidade?: DisponibilidadeInputRefDto;
}
