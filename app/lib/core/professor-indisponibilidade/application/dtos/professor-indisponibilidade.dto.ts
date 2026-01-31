import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/core/@shared";
import { UsuarioFindOneOutput, UsuarioInputRef } from "@/core/usuario/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class ProfessorIndisponibilidadeFindOneInput extends FindOneInput {}

export class ProfessorIndisponibilidadeFindOneOutput extends EntityOutput {
  perfil!: UsuarioFindOneOutput;
  diaDaSemana!: number;
  horaInicio!: string;
  horaFim!: string;
  motivo!: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class ProfessorIndisponibilidadeListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
  "filter.perfil.id"?: IFilterAcceptableValues;
}

export class ProfessorIndisponibilidadeListOutput extends PaginationResult<ProfessorIndisponibilidadeFindOneOutput> {}

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

export type ProfessorIndisponibilidadeInputRef = ObjectUuidRef;
