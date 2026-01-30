import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";
import { CampusFindOneOutput, CampusInputRef } from "../../../campus/application/dtos";
import { ImagemFindOneOutput, ImagemInputRef } from "../../../imagem/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class BlocoFindOneInput {
  id!: string;
}

export class BlocoFindOneOutput {
  id!: string;

  nome!: string;

  codigo!: string;

  campus!: CampusFindOneOutput;

  imagemCapa!: ImagemFindOneOutput | null;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class BlocoListInput extends PaginationInput {
  "filter.id"?: string[];

  "filter.campus.id"?: string[];
}

export class BlocoListOutput {
  meta!: PaginationMeta;
  data!: BlocoFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class BlocoCreateInput {
  nome!: string;

  codigo!: string;

  campus!: CampusInputRef;

  imagemCapa?: ImagemInputRef | null;
}

export class BlocoUpdateInput {
  nome?: string;

  codigo?: string;

  campus?: CampusInputRef;

  imagemCapa?: ImagemInputRef | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export class BlocoInputRef extends ObjectUuidRef {}
