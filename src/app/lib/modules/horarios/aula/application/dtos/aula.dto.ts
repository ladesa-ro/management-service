import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared/application/dtos";
import type { ScalarDate } from "@/modules/@shared/domain/scalars.types";
import { AmbienteFindOneOutputDto, AmbienteInputRefDto } from "@/modules/ambientes/ambiente";
import {
  DiarioFindOneOutputDto,
  DiarioInputRefDto,
} from "@/modules/ensino/diario/application/dtos";
import {
  IntervaloDeTempoFindOneOutputDto,
  IntervaloDeTempoInputRefDto,
} from "@/modules/horarios/intervalo-de-tempo";

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
