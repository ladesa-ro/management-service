import { PaginationMetaGraphQlDto } from "@/infrastructure.graphql/dtos";
import { CidadeFindOneQueryResultFields } from "@/modules/localidades/cidade/domain/queries/cidade-find-one.query.result";
import { CidadeFindOneInputSchema } from "@/modules/localidades/cidade/domain/queries/cidade-find-one.query.schemas";
import { CidadeListQueryFields } from "@/modules/localidades/cidade/domain/queries/cidade-list.query";
import { CidadeGraphqlListInputSchema } from "@/modules/localidades/cidade/domain/queries/cidade-list.query.schemas";
import { EstadoFindOneOutputGraphQlDto } from "@/modules/localidades/estado/presentation.graphql/estado.graphql.dto";
import { ArgsType, Field, InputType, Int, ObjectType } from "@/shared/presentation/graphql";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("CidadeFindOneOutputDto")
export class CidadeFindOneOutputGraphQlDto {
  @Field(() => Int, CidadeFindOneQueryResultFields.id.gqlMetadata) id: number;
  @Field(() => String, CidadeFindOneQueryResultFields.nome.gqlMetadata) nome: string;
  @Field(() => EstadoFindOneOutputGraphQlDto, CidadeFindOneQueryResultFields.estado.gqlMetadata)
  estado: EstadoFindOneOutputGraphQlDto;
}

// ============================================================================
// FindOne Input (for nested references)
// ============================================================================

@InputType("CidadeFindOneInputDto")
export class CidadeFindOneInputGraphQlDto {
  static schema = CidadeFindOneInputSchema;

  @Field(() => Int) id: number;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class CidadeListInputGraphQlDto {
  static schema = CidadeGraphqlListInputSchema;

  @Field(() => Int, CidadeListQueryFields.page.gqlMetadata)
  page?: number;

  @Field(() => Int, CidadeListQueryFields.limit.gqlMetadata)
  limit?: number;

  @Field(() => String, CidadeListQueryFields.search.gqlMetadata)
  search?: string;

  @Field(() => [String], CidadeListQueryFields.sortBy.gqlMetadata)
  sortBy?: string[];

  @Field(() => [String], CidadeListQueryFields.selection.gqlMetadata)
  selection?: string[];

  @Field(() => [String], CidadeListQueryFields.filterId.gqlMetadata)
  filterId?: string[];

  @Field(() => [String], CidadeListQueryFields.filterEstadoId.gqlMetadata)
  filterEstadoId?: string[];

  @Field(() => [String], CidadeListQueryFields.filterEstadoNome.gqlMetadata)
  filterEstadoNome?: string[];

  @Field(() => [String], CidadeListQueryFields.filterEstadoSigla.gqlMetadata)
  filterEstadoSigla?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("CidadeListResult")
export class CidadeListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto, CidadeListQueryFields.meta.gqlMetadata)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [CidadeFindOneOutputGraphQlDto], CidadeListQueryFields.data.gqlMetadata)
  data: CidadeFindOneOutputGraphQlDto[];
}
