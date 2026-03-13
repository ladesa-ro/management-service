import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, Min } from "class-validator";
import { decorate } from "ts-mixer";

/**
 * Base pagination input DTO for REST list queries.
 */
export class PaginationInputRestDto {
  // Index signature for filter properties (compatible with SearchOptions)
  [key: string]: string | number | string[] | null | undefined;

  @decorate(
    ApiPropertyOptional({
      type: "integer",
      description: "Pagina de consulta",
      minimum: 1,
      default: 1,
      example: 1,
    }),
  )
  @decorate(IsOptional())
  @decorate(Type(() => Number))
  @decorate(IsInt())
  @decorate(Min(1))
  page?: number = 1;

  @decorate(
    ApiPropertyOptional({
      type: "integer",
      description: "Limite da quantidade de resultados por pagina",
      minimum: 1,
      example: 10,
    }),
  )
  @decorate(IsOptional())
  @decorate(Type(() => Number))
  @decorate(IsInt())
  @decorate(Min(1))
  limit?: number;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Busca textual",
      example: "termo de busca",
    }),
  )
  @decorate(IsOptional())
  @decorate(IsString())
  search?: string;

  @decorate(
    ApiPropertyOptional({
      description: "Ordenacao (ex: dateCreated:ASC)",
      isArray: true,
      type: "string",
      example: ["dateCreated:ASC"],
    }),
  )
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  sortBy?: string[];

  @decorate(
    ApiPropertyOptional({
      description: "Seleção de campos",
      isArray: true,
      type: "string",
    }),
  )
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  selection?: string[];
}
