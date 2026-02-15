import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared/application/dtos";
import { ImagemFindOneOutputDto, ImagemInputRefDto } from "@/modules/base/armazenamento/imagem";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class DisciplinaFindOneInputDto extends FindOneInputDto {}

export class DisciplinaFindOneOutputDto extends EntityOutputDto {
  nome!: string;
  nomeAbreviado!: string;
  cargaHoraria!: number;
  imagemCapa!: ImagemFindOneOutputDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class DisciplinaListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
}

export class DisciplinaListOutputDto extends PaginationResultDto<DisciplinaFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class DisciplinaCreateInputDto {
  nome!: string;
  nomeAbreviado!: string;
  cargaHoraria!: number;
  imagemCapa?: ImagemInputRefDto | null;
}

export class DisciplinaUpdateInputDto {
  nome?: string;
  nomeAbreviado?: string;
  cargaHoraria?: number;
  imagemCapa?: ImagemInputRefDto | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export type DisciplinaInputRefDto = ObjectUuidRefDto;
