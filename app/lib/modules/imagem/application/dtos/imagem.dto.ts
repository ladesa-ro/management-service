import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/modules/@shared";
import { ArquivoFindOneOutput } from "@/modules/arquivo";

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

export class ImagemFindOneInput extends FindOneInput {}

export class ImagemFindOneOutput extends EntityOutput {
  descricao!: string | null;
  versoes!: ImagemArquivoFindOneFromImagemOutput[];
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

export type ImagemInputRef = ObjectUuidRef;
