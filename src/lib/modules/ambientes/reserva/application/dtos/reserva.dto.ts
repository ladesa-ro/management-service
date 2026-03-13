import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared/application/dtos";
import {
  UsuarioFindOneOutputDto,
  UsuarioInputRefDto,
} from "@/modules/acesso/usuario/application/dtos";
import { AmbienteFindOneOutputDto, AmbienteInputRefDto } from "@/modules/ambientes/ambiente";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class ReservaFindOneInputDto extends FindOneInputDto {}

export class ReservaFindOneOutputDto extends EntityOutputDto {
  situacao!: string;
  motivo!: string | null;
  tipo!: string | null;
  rrule!: string;
  ambiente!: AmbienteFindOneOutputDto;
  usuario!: UsuarioFindOneOutputDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class ReservaListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.situacao"?: IFilterAcceptableValues;
  "filter.tipo"?: IFilterAcceptableValues;
  "filter.ambiente.id"?: IFilterAcceptableValues;
  "filter.ambiente.bloco.id"?: IFilterAcceptableValues;
  "filter.ambiente.bloco.campus.id"?: IFilterAcceptableValues;
  "filter.usuario.id"?: IFilterAcceptableValues;
}

export class ReservaListOutputDto extends PaginationResultDto<ReservaFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class ReservaCreateInputDto {
  situacao!: string;
  motivo?: string | null;
  tipo?: string | null;
  rrule!: string;
  ambiente!: AmbienteInputRefDto;
  usuario!: UsuarioInputRefDto;
}

export class ReservaUpdateInputDto {
  situacao?: string;
  motivo?: string | null;
  tipo?: string | null;
  rrule?: string;
  ambiente?: AmbienteInputRefDto;
  usuario?: UsuarioInputRefDto;
}

// ============================================================================
// Input Ref
// ============================================================================

export type ReservaInputRefDto = ObjectUuidRefDto;
