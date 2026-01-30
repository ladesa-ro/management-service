import {
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/core/@shared";
import { CampusFindOneOutput, CampusInputRef } from "@/core/campus";
import { UsuarioFindOneOutput, UsuarioInputRef } from "@/core/usuario";

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
  "filter.id"?: IFilterAcceptableValues;

  "filter.ativo"?: IFilterAcceptableValues;

  "filter.cargo"?: IFilterAcceptableValues;

  "filter.campus.id"?: IFilterAcceptableValues;

  "filter.usuario.id"?: IFilterAcceptableValues;
}

export class PerfilListOutput extends PaginationResult<PerfilFindOneOutput> {}

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
