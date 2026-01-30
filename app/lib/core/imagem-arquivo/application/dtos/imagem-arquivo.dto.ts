import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";
import { ArquivoFindOneOutput, ArquivoInputRef } from "@/core/arquivo";
import { ImagemFindOneOutput, ImagemInputRef } from "@/core/imagem";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class ImagemArquivoFindOneInput {
  id!: string;
}

export class ImagemArquivoFindOneOutput {
  id!: string;

  largura!: number;

  altura!: number;

  formato!: string;

  mimeType!: string;

  imagem!: ImagemFindOneOutput;

  arquivo!: ArquivoFindOneOutput;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class ImagemArquivoListInput extends PaginationInput {
  "filter.id"?: string[];

  "filter.imagem.id"?: string[];
}

export class ImagemArquivoListOutput {
  meta!: PaginationMeta;
  data!: ImagemArquivoFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class ImagemArquivoCreateInput {
  largura!: number;

  altura!: number;

  formato!: string;

  mimeType!: string;

  imagem!: ImagemInputRef;

  arquivo!: ArquivoInputRef;
}

export class ImagemArquivoUpdateInput {
  largura?: number;

  altura?: number;

  formato?: string;

  mimeType?: string;

  imagem?: ImagemInputRef;

  arquivo?: ArquivoInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class ImagemArquivoInputRef extends ObjectUuidRef {}
