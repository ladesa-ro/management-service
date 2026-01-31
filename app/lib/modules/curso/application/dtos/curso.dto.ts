import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/modules/@shared/application/dtos";
import { CampusFindOneOutput, CampusInputRef } from "@/modules/campus";
import { ImagemFindOneOutput, ImagemInputRef } from "@/modules/imagem";
import { OfertaFormacaoFindOneOutput, OfertaFormacaoInputRef } from "@/modules/oferta-formacao";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class CursoFindOneInput extends FindOneInput {}

export class CursoFindOneOutput extends EntityOutput {
  nome!: string;
  nomeAbreviado!: string;
  campus!: CampusFindOneOutput;
  ofertaFormacao!: OfertaFormacaoFindOneOutput;
  imagemCapa!: ImagemFindOneOutput | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class CursoListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
  "filter.campus.id"?: IFilterAcceptableValues;
  "filter.ofertaFormacao.id"?: IFilterAcceptableValues;
}

export class CursoListOutput extends PaginationResult<CursoFindOneOutput> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class CursoCreateInput {
  nome!: string;
  nomeAbreviado!: string;
  campus!: CampusInputRef;
  ofertaFormacao!: OfertaFormacaoInputRef;
  imagemCapa?: ImagemInputRef | null;
}

export class CursoUpdateInput {
  nome?: string;
  nomeAbreviado?: string;
  campus?: CampusInputRef;
  ofertaFormacao?: OfertaFormacaoInputRef;
  imagemCapa?: ImagemInputRef | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export type CursoInputRef = ObjectUuidRef;
