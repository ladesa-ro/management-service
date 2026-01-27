import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";
import { ImagemFindOneOutput, ImagemInputRef } from "../../../imagem/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class UsuarioFindOneInput {
  id!: string;
}

export class UsuarioFindOneOutput {
  id!: string;

  nome!: string | null;

  matriculaSiape!: string | null;

  email!: string | null;

  isSuperUser!: boolean;

  imagemCapa!: ImagemFindOneOutput | null;

  imagemPerfil!: ImagemFindOneOutput | null;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class UsuarioListInput extends PaginationInput {
  "filter.id"?: string[];
}

export class UsuarioListOutput {
  meta!: PaginationMeta;
  data!: UsuarioFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class UsuarioCreateInput {
  nome?: string | null;

  matriculaSiape?: string | null;

  email?: string | null;

  imagemCapa?: ImagemInputRef | null;

  imagemPerfil?: ImagemInputRef | null;
}

export class UsuarioUpdateInput {
  nome?: string | null;

  matriculaSiape?: string | null;

  email?: string | null;

  imagemCapa?: ImagemInputRef | null;

  imagemPerfil?: ImagemInputRef | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export class UsuarioInputRef extends ObjectUuidRef {}
