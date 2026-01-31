import {
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/core/@shared";
import { CampusFindOneOutput, CampusInputRef } from "@/core/campus";
import { ImagemFindOneOutput, ImagemInputRef } from "@/core/imagem";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class BlocoFindOneInput extends FindOneInput {}

export class BlocoFindOneOutput {
  id!: string;

  nome!: string;

  codigo!: string;

  campus!: CampusFindOneOutput;

  imagemCapa!: ImagemFindOneOutput | null;

  // TODO: Migrate to ScalarDateTimeString and extend DatedOutput
  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class BlocoListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;

  "filter.campus.id"?: IFilterAcceptableValues;
}

export class BlocoListOutput extends PaginationResult<BlocoFindOneOutput> {}

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
