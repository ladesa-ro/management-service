import type { ScalarDate } from "@/Ladesa.Management.Domain/Abstractions/Scalars";
import type { DiarioProfessorInputRefDto } from "./DiarioProfessorInputRefDto";
import type { HorarioGeradoInputRefDto } from "./HorarioGeradoInputRefDto";
import type { IntervaloDeTempoInputRefDto } from "./IntervaloDeTempoInputRefDto";

export class HorarioGeradoAulaCreateInputDto {
  data!: ScalarDate;
  diarioProfessor!: DiarioProfessorInputRefDto;
  horarioGerado!: HorarioGeradoInputRefDto;
  intervaloDeTempo!: IntervaloDeTempoInputRefDto;
}
