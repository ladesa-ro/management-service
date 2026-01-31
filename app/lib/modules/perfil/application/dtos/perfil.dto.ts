import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/modules/@shared";
import { CampusFindOneOutput, CampusInputRef } from "@/modules/campus";
import { UsuarioFindOneOutput, UsuarioInputRef } from "@/modules/usuario";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class PerfilFindOneInput extends FindOneInput {}

export class PerfilFindOneOutput extends EntityOutput {
  ativo!: boolean;
  cargo!: string;
  campus!: CampusFindOneOutput;
  usuario!: UsuarioFindOneOutput;
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

export type PerfilInputRef = ObjectUuidRef;
