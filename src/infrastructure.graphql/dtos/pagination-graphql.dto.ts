import { SharedFields } from "@/domain/abstractions";
import { Field, InputType, Int, ObjectType } from "@/shared/presentation/graphql";
/**
 * Base pagination input DTO for GraphQL queries.
 */
@InputType("PaginationInput")
export class PaginationInputGraphQlDto {
  @Field(() => Int, SharedFields.page.gqlMetadata)
  page?: number = 1;

  @Field(() => Int, SharedFields.limit.gqlMetadata)
  limit?: number;

  @Field(() => String, SharedFields.search.gqlMetadata)
  search?: string;

  @Field(() => [String], SharedFields.sortBy.gqlMetadata)
  sortBy?: string[];
}

/**
 * Pagination metadata DTO for GraphQL.
 */
@ObjectType()
export class PaginationMetaGraphQlDto {
  @Field(() => Int, SharedFields.limit.gqlMetadata)
  itemsPerPage: number;

  @Field(() => Int, { description: "Total de itens" })
  totalItems: number;

  @Field(() => Int, SharedFields.page.gqlMetadata)
  currentPage: number;

  @Field(() => Int, { description: "Quantidade total de paginas" })
  totalPages: number;

  @Field(() => String, SharedFields.search.gqlMetadata)
  search: string;

  @Field(() => [[String]], SharedFields.sortBy.gqlMetadata)
  sortBy: [string, string][];
}
