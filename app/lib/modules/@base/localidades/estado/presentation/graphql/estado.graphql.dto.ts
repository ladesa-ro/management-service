import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { decorate } from "ts-mixer";
import {
  EntityIdIntGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("EstadoFindOneOutputDto"))
export class EstadoFindOneOutputGraphQlDto extends EntityIdIntGraphQlDto {
  @decorate(Field(() => String)) nome: string;
  @decorate(Field(() => String)) sigla: string;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@decorate(ArgsType())
export class EstadoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("EstadoListResult"))
export class EstadoListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [EstadoFindOneOutputGraphQlDto]))
  data: EstadoFindOneOutputGraphQlDto[];
}
