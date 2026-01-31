import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/modules/@shared/application/dtos";
import { ArquivoFindOneOutput, ArquivoInputRef } from "@/modules/arquivo";
import { ImagemFindOneOutput, ImagemInputRef } from "@/modules/imagem";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class ImagemArquivoFindOneInput extends FindOneInput {}

export class ImagemArquivoFindOneOutput extends EntityOutput {
  largura!: number;
  altura!: number;
  formato!: string;
  mimeType!: string;
  imagem!: ImagemFindOneOutput;
  arquivo!: ArquivoFindOneOutput;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class ImagemArquivoListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
  "filter.imagem.id"?: IFilterAcceptableValues;
}

export class ImagemArquivoListOutput extends PaginationResult<ImagemArquivoFindOneOutput> {}

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

export type ImagemArquivoInputRef = ObjectUuidRef;
