import { CampusFindOneOutput, CampusInputRef } from "../../../campus/application/dtos";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";
import { UsuarioFindOneOutput, UsuarioInputRef } from "../../../usuario/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class PerfilFindOneInput {
  id!: string;
}

export class PerfilFindOneOutput {
  id!: string;

  ativo!: boolean;

  cargo!: string;

  campus!: CampusFindOneOutput;

  usuario!: UsuarioFindOneOutput;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class PerfilListInput extends PaginationInput {
  "filter.id"?: string[];

  "filter.campus.id"?: string[];

  "filter.usuario.id"?: string[];
}

export class PerfilListOutput {
  meta!: PaginationMeta;
  data!: PerfilFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class PerfilSetVinculosInput {
  cargos!: string[];

  campus!: CampusInputRef;

  usuario!: UsuarioInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class PerfilInputRef extends ObjectUuidRef {}
