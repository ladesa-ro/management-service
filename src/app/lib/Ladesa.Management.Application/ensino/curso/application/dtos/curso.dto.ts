import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/Ladesa.Management.Application/@shared/application/dtos";
import {
  CampusFindOneOutputDto,
  CampusInputRefDto,
} from "@/Ladesa.Management.Application/ambientes/campus";
import {
  ImagemFindOneOutputDto,
  ImagemInputRefDto,
} from "@/Ladesa.Management.Application/armazenamento/imagem";
import {
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoInputRefDto,
} from "@/Ladesa.Management.Application/ensino/oferta-formacao";

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
