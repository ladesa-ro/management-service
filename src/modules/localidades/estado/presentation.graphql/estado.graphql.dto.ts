import { PaginationMetaGraphQlDto } from "@/infrastructure.graphql/dtos";
import { estadoGraphqlListInputSchema } from "@/modules/localidades/estado/domain/estado.schemas";
import { ArgsType, Field, Int, ObjectType } from "@/shared/presentation/graphql";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("EstadoFindOneOutputDto")
export class EstadoFindOneOutputGraphQlDto {
  @Field(() => Int) id: number;
  @Field(() => String) nome: string;
  @Field(() => String) sigla: string;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class EstadoListInputGraphQlDto {
  static schema = estadoGraphqlListInputSchema;

  @Field(() => Int, { nullable: true, defaultValue: 1 })
  page?: number = 1;

  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => [String], { nullable: true })
  sortBy?: string[];

  @Field(() => [String], { nullable: true })
  selection?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  filterId?: string[];
}

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
