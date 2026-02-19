import { ImagemFindOneOutputDto, ImagemInputRefDto } from "@/modules/armazenamento/imagem";
import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared/application/dtos";
import { AmbienteFindOneOutputDto, AmbienteInputRefDto } from "@/modules/ambientes/ambiente";
import { CursoFindOneOutputDto, CursoInputRefDto } from "@/modules/ensino/curso";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class TurmaFindOneInputDto extends FindOneInputDto {}

export class TurmaFindOneOutputDto extends EntityOutputDto {
  periodo!: string;
  ambientePadraoAula!: AmbienteFindOneOutputDto | null;
  curso!: CursoFindOneOutputDto;
  imagemCapa!: ImagemFindOneOutputDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class TurmaListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.ambientePadraoAula.nome"?: IFilterAcceptableValues;
  "filter.ambientePadraoAula.codigo"?: IFilterAcceptableValues;
  "filter.ambientePadraoAula.capacidade"?: IFilterAcceptableValues;
  "filter.ambientePadraoAula.tipo"?: IFilterAcceptableValues;
  "filter.curso.id"?: IFilterAcceptableValues;
  "filter.curso.nome"?: IFilterAcceptableValues;
  "filter.curso.nomeAbreviado"?: IFilterAcceptableValues;
  "filter.curso.campus.id"?: IFilterAcceptableValues;
  "filter.curso.ofertaFormacao.id"?: IFilterAcceptableValues;
  "filter.curso.ofertaFormacao.nome"?: IFilterAcceptableValues;
  "filter.curso.ofertaFormacao.slug"?: IFilterAcceptableValues;
}

export class TurmaListOutputDto extends PaginationResultDto<TurmaFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class TurmaCreateInputDto {
  periodo!: string;
  curso!: CursoInputRefDto;
  ambientePadraoAula?: AmbienteInputRefDto | null;
  imagemCapa?: ImagemInputRefDto | null;
}

export class TurmaUpdateInputDto {
  periodo?: string;
  curso?: CursoInputRefDto;
  ambientePadraoAula?: AmbienteInputRefDto | null;
  imagemCapa?: ImagemInputRefDto | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export type TurmaInputRefDto = ObjectUuidRefDto;
