import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared/application/dtos";
import { ImagemFindOneOutputDto, ImagemInputRefDto } from "@/modules/base/armazenamento/imagem";
import {
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoInputRefDto,
} from "@/modules/ensino/oferta-formacao";
import { CampusFindOneOutputDto, CampusInputRefDto } from "@/modules/sisgea/campus";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class CursoFindOneInputDto extends FindOneInputDto {}

export class CursoFindOneOutputDto extends EntityOutputDto {
  nome!: string;
  nomeAbreviado!: string;
  campus!: CampusFindOneOutputDto;
  ofertaFormacao!: OfertaFormacaoFindOneOutputDto;
  imagemCapa!: ImagemFindOneOutputDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class CursoListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.campus.id"?: IFilterAcceptableValues;
  "filter.ofertaFormacao.id"?: IFilterAcceptableValues;
}

export class CursoListOutputDto extends PaginationResultDto<CursoFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class CursoCreateInputDto {
  nome!: string;
  nomeAbreviado!: string;
  campus!: CampusInputRefDto;
  ofertaFormacao!: OfertaFormacaoInputRefDto;
  imagemCapa?: ImagemInputRefDto | null;
}

export class CursoUpdateInputDto {
  nome?: string;
  nomeAbreviado?: string;
  campus?: CampusInputRefDto;
  ofertaFormacao?: OfertaFormacaoInputRefDto;
  imagemCapa?: ImagemInputRefDto | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export type CursoInputRefDto = ObjectUuidRefDto;
