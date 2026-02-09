import {
  EntityOutputDto,
  FindOneInputDto,
  IdUuid,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class IntervaloDeTempoFindOneInputDto extends FindOneInputDto {}

export class IntervaloDeTempoFindOneOutputDto extends EntityOutputDto {
  periodoInicio!: string;
  periodoFim!: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class IntervaloDeTempoListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
}

export class IntervaloDeTempoListOutputDto extends PaginationResultDto<IntervaloDeTempoFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class IntervaloDeTempoCreateInputDto {
  periodoInicio!: string;

  periodoFim!: string;
}

export class IntervaloDeTempoUpdateInputDto {
  periodoInicio?: string;

  periodoFim?: string;
}

// ============================================================================
// Input Ref
// ============================================================================

export type IntervaloDeTempoInputRefDto = ObjectUuidRefDto;

// ============================================================================
// Input for create-or-update pattern
// ============================================================================

export class IntervaloDeTempoInputDto {
  id?: IdUuid;

  periodoInicio?: string;

  periodoFim?: string;
}
