import {
  EntityIdIntGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { ArgsType, Field, ObjectType } from "@/modules/@shared/presentation/graphql";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("EstadoFindOneOutputDto")
export class EstadoFindOneOutputGraphQlDto extends EntityIdIntGraphQlDto {
  @Field(() => String) nome: string;
  @Field(() => String) sigla: string;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class EstadoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("EstadoListResult")
export class EstadoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [EstadoFindOneOutputGraphQlDto])
  data: EstadoFindOneOutputGraphQlDto[];
}
