import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";
import { ImagemFindOneOutput, ImagemInputRef } from "../../../imagem/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class DisciplinaFindOneInput {
  id!: string;
}

export class DisciplinaFindOneOutput {
  id!: string;

  nome!: string;

  nomeAbreviado!: string;

  cargaHoraria!: number;

  imagemCapa!: ImagemFindOneOutput | null;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class DisciplinaListInput extends PaginationInput {
  "filter.id"?: string[];
}

export class DisciplinaListOutput {
  meta!: PaginationMeta;
  data!: DisciplinaFindOneOutput[];
}

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

export class DisciplinaInputRef extends ObjectUuidRef {}
