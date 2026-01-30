import { CampusFindOneOutput, CampusInputRef } from "../../../campus/application/dtos";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";
import { ImagemFindOneOutput, ImagemInputRef } from "../../../imagem/application/dtos";
import { OfertaFormacaoFindOneOutput, OfertaFormacaoInputRef, } from "../../../oferta-formacao/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class CursoFindOneInput {
  id!: string;
}

export class CursoFindOneOutput {
  id!: string;

  nome!: string;

  nomeAbreviado!: string;

  campus!: CampusFindOneOutput;

  ofertaFormacao!: OfertaFormacaoFindOneOutput;

  imagemCapa!: ImagemFindOneOutput | null;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class CursoListInput extends PaginationInput {
  "filter.id"?: string[];

  "filter.campus.id"?: string[];

  "filter.ofertaFormacao.id"?: string[];
}

export class CursoListOutput {
  meta!: PaginationMeta;
  data!: CursoFindOneOutput[];
}

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

export class CursoInputRef extends ObjectUuidRef {}
