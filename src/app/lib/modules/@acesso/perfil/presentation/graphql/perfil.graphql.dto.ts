import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
import { UsuarioFindOneOutputGraphQlDto } from "@/modules/@acesso/usuario/presentation/graphql/usuario.graphql.dto";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { CampusFindOneOutputGraphQlDto } from "@/modules/ambientes/campus/presentation/graphql/campus.graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("PerfilFindOneOutputDto"))
export class PerfilFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => Boolean)) ativo: boolean;
  @decorate(Field(() => String)) cargo: string;
  @decorate(Field(() => CampusFindOneOutputGraphQlDto)) campus: CampusFindOneOutputGraphQlDto;
  @decorate(Field(() => UsuarioFindOneOutputGraphQlDto)) usuario: UsuarioFindOneOutputGraphQlDto;
}

// ============================================================================
// SetVinculos Input
// ============================================================================

@decorate(InputType("PerfilRefInputDto"))
export class PerfilRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("PerfilSetVinculosInputDto"))
export class PerfilSetVinculosInputGraphQlDto {
  @decorate(Field(() => [String]))
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  cargos: string[];
  @decorate(Field(() => PerfilRefInputGraphQlDto))
  @decorate(ValidateNested())
  campus: PerfilRefInputGraphQlDto;
  @decorate(Field(() => PerfilRefInputGraphQlDto))
  @decorate(ValidateNested())
  usuario: PerfilRefInputGraphQlDto;
}

// ============================================================================
// List Input
// ============================================================================

@decorate(ArgsType())
export class PerfilListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @decorate(Field(() => [String], { nullable: true, description: "Filtro por ativo" }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  filterAtivo?: string[];

  @decorate(Field(() => [String], { nullable: true, description: "Filtro por cargo" }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  filterCargo?: string[];

  @decorate(Field(() => [String], { nullable: true, description: "Filtro por ID do Campus" }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterCampusId?: string[];

  @decorate(Field(() => [String], { nullable: true, description: "Filtro por ID do Usuario" }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterUsuarioId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("PerfilListResult"))
export class PerfilListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [PerfilFindOneOutputGraphQlDto]))
  data: PerfilFindOneOutputGraphQlDto[];
}
