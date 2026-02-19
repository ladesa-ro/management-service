import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared";
import {
  UsuarioFindOneOutputDto,
  UsuarioInputRefDto,
} from "@/modules/acesso/usuario/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class ProfessorIndisponibilidadeFindOneInputDto extends FindOneInputDto {}

export class ProfessorIndisponibilidadeFindOneOutputDto extends EntityOutputDto {
  perfil!: UsuarioFindOneOutputDto;
  diaDaSemana!: number;
  horaInicio!: string;
  horaFim!: string;
  motivo!: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class ProfessorIndisponibilidadeListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.perfil.id"?: IFilterAcceptableValues;
}

export class ProfessorIndisponibilidadeListOutputDto extends PaginationResultDto<ProfessorIndisponibilidadeFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class ProfessorIndisponibilidadeCreateInputDto {
  perfil!: UsuarioInputRefDto;
  diaDaSemana!: number;
  horaInicio!: string;
  horaFim!: string;
  motivo!: string;
}

export class ProfessorIndisponibilidadeUpdateInputDto {
  perfil?: UsuarioInputRefDto;
  diaDaSemana?: number;
  horaInicio?: string;
  horaFim?: string;
  motivo?: string;
}

// ============================================================================
// Input Ref
// ============================================================================

export type ProfessorIndisponibilidadeInputRefDto = ObjectUuidRefDto;
