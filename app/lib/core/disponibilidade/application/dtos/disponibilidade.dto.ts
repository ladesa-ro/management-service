import {
  DatedOutput,
  FindOneInput,
  IdUuid,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
  ScalarDateTimeString,
} from "@/core/@shared";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class DisponibilidadeFindOneInput extends FindOneInput {}

export class DisponibilidadeFindOneOutput extends DatedOutput {
  id!: IdUuid;

  dataInicio!: ScalarDateTimeString;

  dataFim!: ScalarDateTimeString | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class DisponibilidadeListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
}

export class DisponibilidadeListOutput extends PaginationResult<DisponibilidadeFindOneOutput> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class DisponibilidadeCreateInput {
  dataInicio!: ScalarDateTimeString;

  dataFim?: ScalarDateTimeString | null;
}

export class DisponibilidadeUpdateInput {
  dataInicio?: ScalarDateTimeString;

  dataFim?: ScalarDateTimeString | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export class DisponibilidadeInputRef extends ObjectUuidRef {}
