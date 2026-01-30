import { BlocoFindOneOutput, BlocoInputRef } from "../../../bloco/application/dtos";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";
import { ImagemFindOneOutput, ImagemInputRef } from "../../../imagem/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class AmbienteFindOneInput {
  id!: string;
}

export class AmbienteFindOneOutput {
  id!: string;

  nome!: string;

  descricao!: string | null;

  codigo!: string;

  capacidade!: number | null;

  tipo!: string | null;

  bloco!: BlocoFindOneOutput;

  imagemCapa!: ImagemFindOneOutput | null;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class AmbienteListInput extends PaginationInput {
  "filter.id"?: string[];

  "filter.bloco.id"?: string[];

  "filter.bloco.campus.id"?: string[];
}

export class AmbienteListOutput {
  meta!: PaginationMeta;
  data!: AmbienteFindOneOutput[];
}

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

export class AmbienteInputRef extends ObjectUuidRef {}
