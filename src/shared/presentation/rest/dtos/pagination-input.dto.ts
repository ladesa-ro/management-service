import { ApiPropertyOptional } from "@/shared/presentation/rest";
/**
 * Base pagination input DTO for REST list queries.
 */

export class PaginationInputRestDto {
  // Index signature for filter properties (compatible with SearchOptions)
  [key: string]: string | number | string[] | null | undefined;

  @ApiPropertyOptional({
    type: "integer",
    description: "Pagina de consulta",
    minimum: 1,
    default: 1,
    example: 1,
  })
  page?: number;

  @ApiPropertyOptional({
    type: "integer",
    description: "Limite da quantidade de resultados por pagina",
    minimum: 1,
    example: 10,
  })
  limit?: number;

  @ApiPropertyOptional({
    type: "string",
    description: "Busca textual",
    example: "termo de busca",
  })
  search?: string;

  @ApiPropertyOptional({
    description: "Ordenacao (ex: dateCreated:ASC)",
    isArray: true,
    type: "string",
    example: ["dateCreated:ASC"],
  })
  sortBy?: string[];
}
