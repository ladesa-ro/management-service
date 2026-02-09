import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared/application/dtos";
import { ArquivoFindOneOutputDto, ArquivoInputRefDto } from "@/modules/arquivo";
import { ImagemFindOneOutputDto, ImagemInputRefDto } from "@/modules/imagem";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class ImagemArquivoFindOneInputDto extends FindOneInputDto {}

export class ImagemArquivoFindOneOutputDto extends EntityOutputDto {
  largura!: number;
  altura!: number;
  formato!: string;
  mimeType!: string;
  imagem!: ImagemFindOneOutputDto;
  arquivo!: ArquivoFindOneOutputDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class ImagemArquivoListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.imagem.id"?: IFilterAcceptableValues;
}

export class ImagemArquivoListOutputDto extends PaginationResultDto<ImagemArquivoFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class ImagemArquivoCreateInputDto {
  largura!: number;
  altura!: number;
  formato!: string;
  mimeType!: string;
  imagem!: ImagemInputRefDto;
  arquivo!: ArquivoInputRefDto;
}

export class ImagemArquivoUpdateInputDto {
  largura?: number;
  altura?: number;
  formato?: string;
  mimeType?: string;
  imagem?: ImagemInputRefDto;
  arquivo?: ArquivoInputRefDto;
}

// ============================================================================
// Input Ref
// ============================================================================

export type ImagemArquivoInputRefDto = ObjectUuidRefDto;
