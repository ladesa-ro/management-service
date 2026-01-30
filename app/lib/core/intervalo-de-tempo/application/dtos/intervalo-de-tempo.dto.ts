import {
  IdUuid,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/core/@shared";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class IntervaloDeTempoFindOneInput {
  id!: IdUuid;

  selection?: string[];
}

export class IntervaloDeTempoFindOneOutput {
  id!: IdUuid;

  periodoInicio!: string;

  periodoFim!: string;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
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

export class IntervaloDeTempoInputRef extends ObjectUuidRef {}

// ============================================================================
// Input for create-or-update pattern
// ============================================================================

export class IntervaloDeTempoInput {
  id?: IdUuid;

  periodoInicio?: string;

  periodoFim?: string;
}
