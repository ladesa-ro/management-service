import type { ScalarDateTimeString } from "@/modules/@shared";
import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class DisponibilidadeFindOneInputDto extends FindOneInputDto {}

export class DisponibilidadeFindOneOutputDto extends EntityOutputDto {
  dataInicio!: ScalarDateTimeString;
  dataFim!: ScalarDateTimeString | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class DisponibilidadeListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
}

export class DisponibilidadeListOutputDto extends PaginationResultDto<DisponibilidadeFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class DisponibilidadeCreateInputDto {
  dataInicio!: ScalarDateTimeString;
  dataFim?: ScalarDateTimeString | null;
}

export class DisponibilidadeUpdateInputDto {
  dataInicio?: ScalarDateTimeString;
  dataFim?: ScalarDateTimeString | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export type DisponibilidadeInputRefDto = ObjectUuidRefDto;
