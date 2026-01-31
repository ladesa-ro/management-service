import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/core/@shared/application/dtos";
import { BlocoFindOneOutput, BlocoInputRef } from "@/core/bloco";
import { ImagemFindOneOutput, ImagemInputRef } from "@/core/imagem";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class AmbienteFindOneInput extends FindOneInput {}

export class AmbienteFindOneOutput extends EntityOutput {
  nome!: string;
  descricao!: string | null;
  codigo!: string;
  capacidade!: number | null;
  tipo!: string | null;
  bloco!: BlocoFindOneOutput;
  imagemCapa!: ImagemFindOneOutput | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class AmbienteListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
  "filter.bloco.id"?: IFilterAcceptableValues;
  "filter.bloco.campus.id"?: IFilterAcceptableValues;
}

export class AmbienteListOutput extends PaginationResult<AmbienteFindOneOutput> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class AmbienteCreateInput {
  nome!: string;
  descricao?: string | null;
  codigo!: string;
  capacidade?: number | null;
  tipo?: string | null;
  bloco!: BlocoInputRef;
  imagemCapa?: ImagemInputRef | null;
}

export class AmbienteUpdateInput {
  nome?: string;
  descricao?: string | null;
  codigo?: string;
  capacidade?: number | null;
  tipo?: string | null;
  bloco?: BlocoInputRef;
  imagemCapa?: ImagemInputRef | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export type AmbienteInputRef = ObjectUuidRef;
