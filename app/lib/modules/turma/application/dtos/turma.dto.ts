import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/modules/@shared/application/dtos";
import { AmbienteFindOneOutput, AmbienteInputRef } from "@/modules/ambiente";
import { CursoFindOneOutput, CursoInputRef } from "@/modules/curso";
import { ImagemFindOneOutput, ImagemInputRef } from "@/modules/imagem";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class TurmaFindOneInput extends FindOneInput {}

export class TurmaFindOneOutput extends EntityOutput {
  periodo!: string;
  ambientePadraoAula!: AmbienteFindOneOutput | null;
  curso!: CursoFindOneOutput;
  imagemCapa!: ImagemFindOneOutput | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class TurmaListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
  "filter.curso.id"?: IFilterAcceptableValues;
  "filter.curso.campus.id"?: IFilterAcceptableValues;
}

export class TurmaListOutput extends PaginationResult<TurmaFindOneOutput> {}

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

export type TurmaInputRef = ObjectUuidRef;
