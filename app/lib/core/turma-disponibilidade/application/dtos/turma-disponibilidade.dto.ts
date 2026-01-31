import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/core/@shared";
import { DisponibilidadeFindOneOutput, DisponibilidadeInputRef } from "@/core/disponibilidade";
import { TurmaFindOneOutput, TurmaInputRef } from "@/core/turma";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class TurmaDisponibilidadeFindOneInput extends FindOneInput {}

export class TurmaDisponibilidadeFindOneOutput extends EntityOutput {
  turma!: TurmaFindOneOutput;
  disponibilidade!: DisponibilidadeFindOneOutput;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class TurmaDisponibilidadeListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
  "filter.turma.id"?: IFilterAcceptableValues;
}

export class TurmaDisponibilidadeListOutput extends PaginationResult<TurmaDisponibilidadeFindOneOutput> {}

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

export type TurmaDisponibilidadeInputRef = ObjectUuidRef;
