import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";
import { UsuarioFindOneOutput, UsuarioInputRef } from "../../../usuario/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class ProfessorIndisponibilidadeFindOneInput {
  id!: string;
}

export class ProfessorIndisponibilidadeFindOneOutput {
  id!: string;

  perfil!: UsuarioFindOneOutput;

  diaDaSemana!: number;

  horaInicio!: string;

  horaFim!: string;

  motivo!: string;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class ProfessorIndisponibilidadeListInput extends PaginationInput {
  "filter.id"?: string[];

  "filter.perfil.id"?: string[];
}

export class ProfessorIndisponibilidadeListOutput {
  meta!: PaginationMeta;
  data!: ProfessorIndisponibilidadeFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class ProfessorIndisponibilidadeCreateInput {
  perfil!: UsuarioInputRef;

  diaDaSemana!: number;

  horaInicio!: string;

  horaFim!: string;

  motivo!: string;
}

export class ProfessorIndisponibilidadeUpdateInput {
  perfil?: UsuarioInputRef;

  diaDaSemana?: number;

  horaInicio?: string;

  horaFim?: string;

  motivo?: string;
}

// ============================================================================
// Input Ref
// ============================================================================

export class ProfessorIndisponibilidadeInputRef extends ObjectUuidRef {}
