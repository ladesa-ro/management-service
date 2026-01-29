import { ArgsType, Field, Int } from "@nestjs/graphql";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, Min } from "class-validator";

/**
 * Base pagination input DTO for list queries.
 */
@ArgsType()
export class PaginationInputDto {
  // Index signature for filter properties (compatible with SearchOptions)
  [key: string]: string | string[] | number | number[] | null | undefined;

  @ApiPropertyOptional({
    description: "Pagina de consulta",
    minimum: 1,
    default: 1,
    example: 1,
  })
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: "Limite da quantidade de resultados por pagina",
    minimum: 1,
    example: 10,
  })
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({
    description: "Busca textual",
    example: "termo de busca",
  })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: "Ordenacao (ex: dateCreated:ASC)",
    isArray: true,
    type: String,
    example: ["dateCreated:ASC"],
  })
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sortBy?: string[];
}
