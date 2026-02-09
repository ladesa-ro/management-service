import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared/application/dtos";
import { ImagemFindOneOutputDto, ImagemInputRefDto } from "@/modules/imagem";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class UsuarioFindOneInputDto extends FindOneInputDto {}

export class UsuarioFindOneOutputDto extends EntityOutputDto {
  nome!: string | null;
  matriculaSiape!: string | null;
  email!: string | null;
  isSuperUser!: boolean;
  imagemCapa!: ImagemFindOneOutputDto | null;
  imagemPerfil!: ImagemFindOneOutputDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class UsuarioListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
}

export class UsuarioListOutputDto extends PaginationResultDto<UsuarioFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class UsuarioCreateInputDto {
  nome?: string | null;
  matriculaSiape?: string | null;
  email?: string | null;
  imagemCapa?: ImagemInputRefDto | null;
  imagemPerfil?: ImagemInputRefDto | null;
}

export class UsuarioUpdateInputDto {
  nome?: string | null;
  matriculaSiape?: string | null;
  email?: string | null;
  imagemCapa?: ImagemInputRefDto | null;
  imagemPerfil?: ImagemInputRefDto | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export type UsuarioInputRefDto = ObjectUuidRefDto;

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
  usuario: UsuarioFindOneOutputDto;
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
