import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class IntervaloDeTempoFindOneInput {
  id!: string;
}

export class IntervaloDeTempoFindOneOutput {
  id!: string;

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
  "filter.id"?: string[];
}

export class IntervaloDeTempoListOutput {
  meta!: PaginationMeta;
  data!: IntervaloDeTempoFindOneOutput[];
}

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
  id?: string;

  periodoInicio?: string;

  periodoFim?: string;
}
