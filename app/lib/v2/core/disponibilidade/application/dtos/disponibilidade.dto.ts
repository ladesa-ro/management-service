import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class DisponibilidadeFindOneInput {
  id!: string;
}

export class DisponibilidadeFindOneOutput {
  id!: string;

  dataInicio!: Date;

  dataFim!: Date | null;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class DisponibilidadeListInput extends PaginationInput {
  "filter.id"?: string[];
}

export class DisponibilidadeListOutput {
  meta!: PaginationMeta;
  data!: DisponibilidadeFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class DisponibilidadeCreateInput {
  dataInicio!: Date;

  dataFim?: Date | null;
}

export class DisponibilidadeUpdateInput {
  dataInicio?: Date;

  dataFim?: Date | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export class DisponibilidadeInputRef extends ObjectUuidRef {}
