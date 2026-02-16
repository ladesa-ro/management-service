import { ArgsType, Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsArray, IsInt, IsOptional, IsString, IsUUID } from "class-validator";
import { decorate } from "ts-mixer";
import {
  EntityIdIntGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { EstadoFindOneOutputGraphQlDto } from "@/modules/base/localidades/estado/presentation/graphql/estado.graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("CidadeFindOneOutputDto"))
export class CidadeFindOneOutputGraphQlDto extends EntityIdIntGraphQlDto {
  @decorate(Field(() => String)) nome: string;
  @decorate(Field(() => EstadoFindOneOutputGraphQlDto)) estado: EstadoFindOneOutputGraphQlDto;
}

// ============================================================================
// FindOne Input (for nested references)
// ============================================================================

@decorate(InputType("CidadeFindOneInputDto"))
export class CidadeFindOneInputGraphQlDto {
  @decorate(Field(() => Int)) @decorate(IsInt()) id: number;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@decorate(ArgsType())
export class CidadeListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @decorate(Field(() => [String], { nullable: true, description: "Filtro por ID do Estado" }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterEstadoId?: string[];

  @decorate(Field(() => [String], { nullable: true, description: "Filtro por nome do Estado" }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  filterEstadoNome?: string[];

  @decorate(Field(() => [String], { nullable: true, description: "Filtro por sigla do Estado" }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  filterEstadoSigla?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("CidadeListResult"))
export class CidadeListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [CidadeFindOneOutputGraphQlDto]))
  data: CidadeFindOneOutputGraphQlDto[];
}
