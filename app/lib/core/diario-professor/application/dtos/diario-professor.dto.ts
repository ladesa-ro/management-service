import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";
import { DiarioFindOneOutput, DiarioInputRef } from "@/core/diario/application/dtos";
import { PerfilFindOneOutput, PerfilInputRef } from "@/core/perfil";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class DiarioProfessorFindOneInput {
  id!: string;
}

export class DiarioProfessorFindOneOutput {
  id!: string;

  situacao!: boolean;

  diario!: DiarioFindOneOutput;

  perfil!: PerfilFindOneOutput;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class DiarioProfessorListInput extends PaginationInput {
  "filter.id"?: string[];

  "filter.diario.id"?: string[];

  "filter.perfil.id"?: string[];

  "filter.perfil.usuario.id"?: string[];
}

export class DiarioProfessorListOutput {
  meta!: PaginationMeta;
  data!: DiarioProfessorFindOneOutput[];
}

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

export class DiarioProfessorInputRef extends ObjectUuidRef {}
