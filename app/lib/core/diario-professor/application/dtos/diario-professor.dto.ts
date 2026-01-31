import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/core/@shared";
import { DiarioFindOneOutput, DiarioInputRef } from "@/core/diario/application/dtos";
import { PerfilFindOneOutput, PerfilInputRef } from "@/core/perfil";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class DiarioProfessorFindOneInput extends FindOneInput {}

export class DiarioProfessorFindOneOutput extends EntityOutput {
  situacao!: boolean;
  diario!: DiarioFindOneOutput;
  perfil!: PerfilFindOneOutput;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class DiarioProfessorListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
  "filter.diario.id"?: IFilterAcceptableValues;
  "filter.perfil.id"?: IFilterAcceptableValues;
  "filter.perfil.usuario.id"?: IFilterAcceptableValues;
}

export class DiarioProfessorListOutput extends PaginationResult<DiarioProfessorFindOneOutput> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class DiarioProfessorCreateInput {
  situacao!: boolean;
  diario!: DiarioInputRef;
  perfil!: PerfilInputRef;
}

export class DiarioProfessorUpdateInput {
  situacao?: boolean;
  diario?: DiarioInputRef;
  perfil?: PerfilInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export type DiarioProfessorInputRef = ObjectUuidRef;
