import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/core/@shared/application/dtos";
import { ImagemFindOneOutput, ImagemInputRef } from "@/core/imagem";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class DisciplinaFindOneInput extends FindOneInput {}

export class DisciplinaFindOneOutput extends EntityOutput {
  nome!: string;
  nomeAbreviado!: string;
  cargaHoraria!: number;
  imagemCapa!: ImagemFindOneOutput | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class DisciplinaListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
}

export class DisciplinaListOutput extends PaginationResult<DisciplinaFindOneOutput> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class DisciplinaCreateInput {
  nome!: string;
  nomeAbreviado!: string;
  cargaHoraria!: number;
  imagemCapa?: ImagemInputRef | null;
}

export class DisciplinaUpdateInput {
  nome?: string;
  nomeAbreviado?: string;
  cargaHoraria?: number;
  imagemCapa?: ImagemInputRef | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export type DisciplinaInputRef = ObjectUuidRef;
