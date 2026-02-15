import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared";
import { UsuarioFindOneOutputDto, UsuarioInputRefDto } from "@/modules/acesso/usuario";
import { CampusFindOneOutputDto, CampusInputRefDto } from "@/modules/sisgea/campus";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class PerfilFindOneInputDto extends FindOneInputDto {}

export class PerfilFindOneOutputDto extends EntityOutputDto {
  ativo!: boolean;
  cargo!: string;
  campus!: CampusFindOneOutputDto;
  usuario!: UsuarioFindOneOutputDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class PerfilListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.ativo"?: IFilterAcceptableValues;
  "filter.cargo"?: IFilterAcceptableValues;
  "filter.campus.id"?: IFilterAcceptableValues;
  "filter.usuario.id"?: IFilterAcceptableValues;
}

export class PerfilListOutputDto extends PaginationResultDto<PerfilFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class PerfilSetVinculosInputDto {
  cargos!: string[];
  campus!: CampusInputRefDto;
  usuario!: UsuarioInputRefDto;
}

// ============================================================================
// Input Ref
// ============================================================================

export type PerfilInputRefDto = ObjectUuidRefDto;
