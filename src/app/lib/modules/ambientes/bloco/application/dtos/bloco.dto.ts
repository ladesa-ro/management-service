import { ImagemFindOneOutputDto, ImagemInputRefDto } from "@/modules/armazenamento/imagem";
import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared";
import { CampusFindOneOutputDto, CampusInputRefDto } from "@/modules/ambientes/campus";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class BlocoFindOneInputDto extends FindOneInputDto {}

export class BlocoFindOneOutputDto extends EntityOutputDto {
  nome!: string;
  codigo!: string;
  campus!: CampusFindOneOutputDto;
  imagemCapa!: ImagemFindOneOutputDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class BlocoListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.campus.id"?: IFilterAcceptableValues;
}

export class BlocoListOutputDto extends PaginationResultDto<BlocoFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class BlocoCreateInputDto {
  nome!: string;
  codigo!: string;
  campus!: CampusInputRefDto;
  imagemCapa?: ImagemInputRefDto | null;
}

export class BlocoUpdateInputDto {
  nome?: string;
  codigo?: string;
  campus?: CampusInputRefDto;
  imagemCapa?: ImagemInputRefDto | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export type BlocoInputRefDto = ObjectUuidRefDto;
