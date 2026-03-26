import { PaginationMetaGraphQlDto } from "@/infrastructure.graphql/dtos";
import { EstadoFindOneQueryResultFields } from "@/modules/localidades/estado/domain/queries/estado-find-one.query.result";
import { EstadoListQueryFields } from "@/modules/localidades/estado/domain/queries/estado-list.query";
import { ArgsType, Field, Int, ObjectType } from "@/shared/presentation/graphql";
import { createGraphqlListInputSchema } from "@/shared/validation/schemas";

const EstadoGraphqlListInputSchema = createGraphqlListInputSchema();

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("EstadoFindOneOutputDto")
export class EstadoFindOneOutputGraphQlDto {
  @Field(() => Int, EstadoFindOneQueryResultFields.id.gqlMetadata)
  id: number;
  @Field(() => String, EstadoFindOneQueryResultFields.nome.gqlMetadata)
  nome: string;
  @Field(() => String, EstadoFindOneQueryResultFields.sigla.gqlMetadata)
  sigla: string;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class EstadoListInputGraphQlDto {
  static schema = EstadoGraphqlListInputSchema;

  @Field(() => Int, EstadoListQueryFields.page.gqlMetadata)
  page?: number;

  @Field(() => Int, EstadoListQueryFields.limit.gqlMetadata)
  limit?: number;

  @Field(() => String, EstadoListQueryFields.search.gqlMetadata)
  search?: string;

  @Field(() => [String], EstadoListQueryFields.sortBy.gqlMetadata)
  sortBy?: string[];

  @Field(() => [String], EstadoListQueryFields.filterId.gqlMetadata)
  filterId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("EstadoListResult")
export class EstadoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto, EstadoListQueryFields.meta.gqlMetadata)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [EstadoFindOneOutputGraphQlDto], EstadoListQueryFields.data.gqlMetadata)
  data: EstadoFindOneOutputGraphQlDto[];
}
