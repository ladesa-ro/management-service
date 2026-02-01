import { ArgsType, Field, Int } from "@nestjs/graphql";
import { IsArray, IsInt, IsOptional, IsString, Min } from "class-validator";

/**
 * Base pagination args for GraphQL queries.
 * GraphQL-compatible (no dots in field names).
 */
@ArgsType()
export class PaginationGraphqlArgsDto {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sortBy?: string[];
}
