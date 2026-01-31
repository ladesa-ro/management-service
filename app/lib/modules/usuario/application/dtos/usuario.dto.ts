import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/modules/@shared/application/dtos";
import { ImagemFindOneOutput, ImagemInputRef } from "@/modules/imagem";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class UsuarioFindOneInput extends FindOneInput {}

export class UsuarioFindOneOutput extends EntityOutput {
  nome!: string | null;
  matriculaSiape!: string | null;
  email!: string | null;
  isSuperUser!: boolean;
  imagemCapa!: ImagemFindOneOutput | null;
  imagemPerfil!: ImagemFindOneOutput | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class UsuarioListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
}

export class UsuarioListOutput extends PaginationResult<UsuarioFindOneOutput> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class UsuarioCreateInput {
  nome?: string | null;
  matriculaSiape?: string | null;
  email?: string | null;
  imagemCapa?: ImagemInputRef | null;
  imagemPerfil?: ImagemInputRef | null;
}

export class UsuarioUpdateInput {
  nome?: string | null;
  matriculaSiape?: string | null;
  email?: string | null;
  imagemCapa?: ImagemInputRef | null;
  imagemPerfil?: ImagemInputRef | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export type UsuarioInputRef = ObjectUuidRef;

// ============================================================================
// Ensino Output (dados de ensino do usuario)
// ============================================================================

export interface UsuarioEnsinoTurmaRef {
  id: string;
  periodo: string;
}

export interface UsuarioEnsinoCursoRef {
  id: string;
  nome: string;
}

export interface UsuarioEnsinoDisciplinaRef {
  id: string;
  nome: string;
}

export interface UsuarioEnsinoOutput {
  usuario: UsuarioFindOneOutput;
  disciplinas: Array<{
    disciplina: UsuarioEnsinoDisciplinaRef;
    cursos: Array<{
      curso: UsuarioEnsinoCursoRef;
      turmas: Array<{
        turma: UsuarioEnsinoTurmaRef;
      }>;
    }>;
  }>;
}
