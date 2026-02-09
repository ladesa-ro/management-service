import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared/application/dtos";
import { BlocoFindOneOutputDto, BlocoInputRefDto } from "@/modules/bloco";
import { ImagemFindOneOutputDto, ImagemInputRefDto } from "@/modules/imagem";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class AmbienteFindOneInputDto extends FindOneInputDto {}

export class AmbienteFindOneOutputDto extends EntityOutputDto {
  nome!: string;
  descricao!: string | null;
  codigo!: string;
  capacidade!: number | null;
  tipo!: string | null;
  bloco!: BlocoFindOneOutputDto;
  imagemCapa!: ImagemFindOneOutputDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class AmbienteListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.bloco.id"?: IFilterAcceptableValues;
  "filter.bloco.campus.id"?: IFilterAcceptableValues;
}

export class AmbienteListOutputDto extends PaginationResultDto<AmbienteFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class AmbienteCreateInputDto {
  nome!: string;
  descricao?: string | null;
  codigo!: string;
  capacidade?: number | null;
  tipo?: string | null;
  bloco!: BlocoInputRefDto;
  imagemCapa?: ImagemInputRefDto | null;
}

export class AmbienteUpdateInputDto {
  nome?: string;
  descricao?: string | null;
  codigo?: string;
  capacidade?: number | null;
  tipo?: string | null;
  bloco?: BlocoInputRefDto;
  imagemCapa?: ImagemInputRefDto | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export type AmbienteInputRefDto = ObjectUuidRefDto;
