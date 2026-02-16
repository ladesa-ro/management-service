import { PerfilFindOneOutputDto, PerfilInputRefDto } from "@/modules/@acesso/perfil";
import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared";
import {
  DiarioFindOneOutputDto,
  DiarioInputRefDto,
} from "@/modules/ensino/diario/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class DiarioProfessorFindOneInputDto extends FindOneInputDto {}

export class DiarioProfessorFindOneOutputDto extends EntityOutputDto {
  situacao!: boolean;
  diario!: DiarioFindOneOutputDto;
  perfil!: PerfilFindOneOutputDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class DiarioProfessorListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.diario.id"?: IFilterAcceptableValues;
  "filter.perfil.id"?: IFilterAcceptableValues;
  "filter.perfil.usuario.id"?: IFilterAcceptableValues;
}

export class DiarioProfessorListOutputDto extends PaginationResultDto<DiarioProfessorFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class DiarioProfessorCreateInputDto {
  situacao!: boolean;
  diario!: DiarioInputRefDto;
  perfil!: PerfilInputRefDto;
}

export class DiarioProfessorUpdateInputDto {
  situacao?: boolean;
  diario?: DiarioInputRefDto;
  perfil?: PerfilInputRefDto;
}

// ============================================================================
// Input Ref
// ============================================================================

export type DiarioProfessorInputRefDto = ObjectUuidRefDto;
