import { Field, InputType, Int, ObjectType } from "@/shared/presentation/graphql";
/**
 * Base pagination input DTO for GraphQL queries.
 */
@InputType("PaginationInput")
export class PaginationInputGraphQlDto {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  page?: number = 1;

  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => [String], { nullable: true })
  sortBy?: string[];
}

/**
 * Pagination metadata DTO for GraphQL.
 */
@ObjectType()
export class PaginationMetaGraphQlDto {
  @Field(() => Int)
  itemsPerPage: number;

  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => String)
  search: string;

  @Field(() => [[String]])
  sortBy: [string, string][];
}
