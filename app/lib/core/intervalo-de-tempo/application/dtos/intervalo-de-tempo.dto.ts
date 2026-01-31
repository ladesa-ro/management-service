import {
  EntityOutput,
  FindOneInput,
  IdUuid,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/core/@shared";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class IntervaloDeTempoFindOneInput extends FindOneInput {}

export class IntervaloDeTempoFindOneOutput extends EntityOutput {
  periodoInicio!: string;
  periodoFim!: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class IntervaloDeTempoListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
}

export class IntervaloDeTempoListOutput extends PaginationResult<IntervaloDeTempoFindOneOutput> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class IntervaloDeTempoCreateInput {
  periodoInicio!: string;

  periodoFim!: string;
}

export class IntervaloDeTempoUpdateInput {
  periodoInicio?: string;

  periodoFim?: string;
}

// ============================================================================
// Input Ref
// ============================================================================

export type IntervaloDeTempoInputRef = ObjectUuidRef;

// ============================================================================
// Input for create-or-update pattern
// ============================================================================

export class IntervaloDeTempoInput {
  id?: IdUuid;

  periodoInicio?: string;

  periodoFim?: string;
}
