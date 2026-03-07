import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import type { ScalarDate } from "@/Ladesa.Management.Domain/Abstractions/Scalars";
import { AmbienteFindOneOutputDto } from "./AmbienteFindOneOutputDto";
import { DiarioFindOneOutputDto } from "./DiarioFindOneOutputDto";
import { IntervaloDeTempoFindOneOutputDto } from "./IntervaloDeTempoFindOneOutputDto";

export class AulaFindOneOutputDto extends EntityOutputDto {
  data!: ScalarDate;
  modalidade!: string | null;
  intervaloDeTempo!: IntervaloDeTempoFindOneOutputDto;
  diario!: DiarioFindOneOutputDto;
  ambiente!: AmbienteFindOneOutputDto | null;
}
