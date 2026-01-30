import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";
import { DisponibilidadeFindOneOutput, DisponibilidadeInputRef, } from "../../../disponibilidade/application/dtos";
import { TurmaFindOneOutput, TurmaInputRef } from "../../../turma/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class TurmaDisponibilidadeFindOneInput {
  id!: string;
}

export class TurmaDisponibilidadeFindOneOutput {
  id!: string;

  turma!: TurmaFindOneOutput;

  disponibilidade!: DisponibilidadeFindOneOutput;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class TurmaDisponibilidadeListInput extends PaginationInput {
  "filter.id"?: string[];

  "filter.turma.id"?: string[];
}

export class TurmaDisponibilidadeListOutput {
  meta!: PaginationMeta;
  data!: TurmaDisponibilidadeFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class TurmaDisponibilidadeCreateInput {
  turma!: TurmaInputRef;

  disponibilidade!: DisponibilidadeInputRef;
}

export class TurmaDisponibilidadeUpdateInput {
  turma?: TurmaInputRef;

  disponibilidade?: DisponibilidadeInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class TurmaDisponibilidadeInputRef extends ObjectUuidRef {}
