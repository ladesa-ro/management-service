import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import type { ScalarDate } from "@/Ladesa.Management.Domain/Abstractions/Scalars";
import { DiarioProfessorFindOneOutputDto } from "./DiarioProfessorFindOneOutputDto";
import { HorarioGeradoFindOneOutputDto } from "./HorarioGeradoFindOneOutputDto";
import { IntervaloDeTempoFindOneOutputDto } from "./IntervaloDeTempoFindOneOutputDto";

export class HorarioGeradoAulaFindOneOutputDto extends EntityOutputDto {
  data!: ScalarDate;
  diarioProfessor!: DiarioProfessorFindOneOutputDto;
  horarioGerado!: HorarioGeradoFindOneOutputDto;
  intervaloDeTempo!: IntervaloDeTempoFindOneOutputDto;
}
