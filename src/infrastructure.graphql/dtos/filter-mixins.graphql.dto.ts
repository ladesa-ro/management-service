import { SharedFields } from "@/domain/abstractions";
import { Field } from "@/shared/presentation/graphql";
import { PaginationInputGraphQlDto } from "./pagination-graphql.dto";

/**
 * Base para ListInput GraphQL que inclui filtro por ID.
 * Praticamente todos os módulos usam filterId.
 */

export class PaginatedFilterByIdGraphQlDto extends PaginationInputGraphQlDto {
  @Field(() => [String], SharedFields.filterId.gqlMetadata)
  filterId?: string[];
}
