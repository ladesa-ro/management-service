import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsArray, IsInt, IsOptional, IsString, Min } from "class-validator";
import { decorate } from "ts-mixer";

/**
 * Base pagination input DTO for GraphQL queries.
 */
@decorate(InputType("PaginationInput"))
export class PaginationInputGraphQlDto {
  @decorate(Field(() => Int, { nullable: true, defaultValue: 1 }))
  @decorate(IsOptional())
  @decorate(IsInt())
  @decorate(Min(1))
  page?: number = 1;

  @decorate(Field(() => Int, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsInt())
  @decorate(Min(1))
  limit?: number;

  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  search?: string;

  @decorate(Field(() => [String], { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  sortBy?: string[];

  @decorate(Field(() => [String], { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  selection?: string[];
}

/**
 * Pagination metadata DTO for GraphQL.
 */
@decorate(ObjectType())
export class PaginationMetaGraphQlDto {
  @decorate(Field(() => Int))
  itemsPerPage: number;

  @decorate(Field(() => Int))
  totalItems: number;

  @decorate(Field(() => Int))
  currentPage: number;

  @decorate(Field(() => Int))
  totalPages: number;

  @decorate(Field(() => String))
  search: string;

  @decorate(Field(() => [[String]]))
  sortBy: [string, string][];
}
