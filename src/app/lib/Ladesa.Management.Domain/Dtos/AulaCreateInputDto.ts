import type { ScalarDate } from "@/Ladesa.Management.Domain/Abstractions/Scalars";
import type { AmbienteInputRefDto } from "./AmbienteInputRefDto";
import type { DiarioInputRefDto } from "./DiarioInputRefDto";
import type { IntervaloDeTempoInputRefDto } from "./IntervaloDeTempoInputRefDto";

export class AulaCreateInputDto {
  data!: ScalarDate;
  modalidade?: string | null;
  intervaloDeTempo!: IntervaloDeTempoInputRefDto;
  diario!: DiarioInputRefDto;
  ambiente?: AmbienteInputRefDto | null;
}
