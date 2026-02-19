import { Field } from "@nestjs/graphql";
import { IsArray, IsOptional, IsUUID } from "class-validator";
import { decorate } from "ts-mixer";
import { PaginationInputGraphQlDto } from "./pagination-graphql.dto";

/**
 * Base para ListInput GraphQL que inclui filtro por ID.
 * Praticamente todos os módulos usam filterId.
 */
export class PaginatedFilterByIdGraphQlDto extends PaginationInputGraphQlDto {
  @decorate(Field(() => [String], { nullable: true, description: "Filtro por ID" }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterId?: string[];
}
