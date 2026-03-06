import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/Ladesa.Management.Application/@shared/application/dtos";
import {
  AmbienteFindOneOutputDto,
  AmbienteInputRefDto,
} from "@/Ladesa.Management.Application/ambientes/ambiente";
import {
  DiarioFindOneOutputDto,
  DiarioInputRefDto,
} from "@/Ladesa.Management.Application/ensino/diario/application/dtos";
import {
  IntervaloDeTempoFindOneOutputDto,
  IntervaloDeTempoInputRefDto,
} from "@/Ladesa.Management.Application/horarios/intervalo-de-tempo";
import type { ScalarDate } from "@/Ladesa.Management.Domain/Abstractions/Scalars";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class AulaFindOneInputDto extends FindOneInputDto {}

export class AulaFindOneOutputDto extends EntityOutputDto {
  data!: ScalarDate;
  modalidade!: string | null;
  intervaloDeTempo!: IntervaloDeTempoFindOneOutputDto;
  diario!: DiarioFindOneOutputDto;
  ambiente!: AmbienteFindOneOutputDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class AulaListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.diario.id"?: IFilterAcceptableValues;
  "filter.intervaloDeTempo.id"?: IFilterAcceptableValues;
}

export class AulaListOutputDto extends PaginationResultDto<AulaFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class AulaCreateInputDto {
  data!: ScalarDate;
  modalidade?: string | null;
  intervaloDeTempo!: IntervaloDeTempoInputRefDto;
  diario!: DiarioInputRefDto;
  ambiente?: AmbienteInputRefDto | null;
}

export class AulaUpdateInputDto {
  data?: ScalarDate;
  modalidade?: string | null;
  intervaloDeTempo?: IntervaloDeTempoInputRefDto;
  diario?: DiarioInputRefDto;
  ambiente?: AmbienteInputRefDto | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export type AulaInputRefDto = ObjectUuidRefDto;
