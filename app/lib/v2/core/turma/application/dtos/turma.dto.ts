import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";
import { AmbienteFindOneOutput, AmbienteInputRef } from "../../../ambiente/application/dtos";
import { CursoFindOneOutput, CursoInputRef } from "../../../curso/application/dtos";
import { ImagemFindOneOutput, ImagemInputRef } from "../../../imagem/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class TurmaFindOneInput {
  id!: string;
}

export class TurmaFindOneOutput {
  id!: string;

  periodo!: string;

  ambientePadraoAula!: AmbienteFindOneOutput | null;

  curso!: CursoFindOneOutput;

  imagemCapa!: ImagemFindOneOutput | null;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class TurmaListInput extends PaginationInput {
  "filter.id"?: string[];

  "filter.curso.id"?: string[];

  "filter.curso.campus.id"?: string[];
}

export class TurmaListOutput {
  meta!: PaginationMeta;
  data!: TurmaFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class TurmaCreateInput {
  periodo!: string;

  curso!: CursoInputRef;

  ambientePadraoAula?: AmbienteInputRef | null;

  imagemCapa?: ImagemInputRef | null;
}

export class TurmaUpdateInput {
  periodo?: string;

  curso?: CursoInputRef;

  ambientePadraoAula?: AmbienteInputRef | null;

  imagemCapa?: ImagemInputRef | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export class TurmaInputRef extends ObjectUuidRef {}
