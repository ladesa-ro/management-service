import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared";
import { ArquivoFindOneOutputDto } from "@/modules/arquivo";

// ============================================================================
// Imagem Arquivo Output (for versoes relation)
// ============================================================================

export class ImagemArquivoFindOneFromImagemOutputDto {
  id!: string;
  largura!: number | null;
  altura!: number | null;
  formato!: string | null;
  mimeType!: string | null;
  arquivo!: ArquivoFindOneOutputDto;
}

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class ImagemFindOneInputDto extends FindOneInputDto {}

export class ImagemFindOneOutputDto extends EntityOutputDto {
  descricao!: string | null;
  versoes!: ImagemArquivoFindOneFromImagemOutputDto[];
}

// ============================================================================
// List Input/Output
// ============================================================================

export class ImagemListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
}

export class ImagemListOutputDto extends PaginationResultDto<ImagemFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class ImagemCreateInputDto {
  descricao?: string | null;
}

export class ImagemUpdateInputDto {
  descricao?: string | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export type ImagemInputRefDto = ObjectUuidRefDto;
