import {
  IdUuid,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/core/@shared";
import { ArquivoFindOneOutput } from "@/core/arquivo";

// ============================================================================
// Imagem Arquivo Output (for versoes relation)
// ============================================================================

export class ImagemArquivoFindOneFromImagemOutput {
  id!: string;

  largura!: number | null;

  altura!: number | null;

  formato!: string | null;

  mimeType!: string | null;

  arquivo!: ArquivoFindOneOutput;
}

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class ImagemFindOneInput {
  id!: IdUuid;

  selection?: string[];
}

export class ImagemFindOneOutput {
  id!: IdUuid;

  descricao!: string | null;

  versoes!: ImagemArquivoFindOneFromImagemOutput[];

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class ImagemListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
}

export class ImagemListOutput extends PaginationResult<ImagemFindOneOutput> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class ImagemCreateInput {
  descricao?: string | null;
}

export class ImagemUpdateInput {
  descricao?: string | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export class ImagemInputRef extends ObjectUuidRef {}
