import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/modules/@shared";
import { CampusFindOneOutput, CampusInputRef } from "@/modules/campus";
import { ImagemFindOneOutput, ImagemInputRef } from "@/modules/imagem";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class BlocoFindOneInput extends FindOneInput {}

export class BlocoFindOneOutput extends EntityOutput {
  nome!: string;
  codigo!: string;
  campus!: CampusFindOneOutput;
  imagemCapa!: ImagemFindOneOutput | null;
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

export type BlocoInputRef = ObjectUuidRef;
