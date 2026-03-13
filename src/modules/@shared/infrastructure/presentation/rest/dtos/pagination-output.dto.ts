import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { decorate } from "ts-mixer";

/**
 * Representa uma entrada de ordenação [campo, direcao]
 */
export class SortByEntryRestDto {
  @decorate(ApiProperty({ type: "string", description: "Nome do campo", example: "nome" }))
  0: string;

  @decorate(
    ApiProperty({
      type: "string",
      description: "Direcao da ordenacao (ASC ou DESC)",
      example: "ASC",
      enum: ["ASC", "DESC"],
    }),
  )
  1: string;
}

/**
 * Pagination metadata DTO for REST.
 */
export class PaginationMetaRestDto {
  @decorate(ApiProperty({ type: "integer", description: "Quantidade de itens por pagina" }))
  itemsPerPage: number;

  @decorate(ApiProperty({ type: "integer", description: "Total de itens" }))
  totalItems: number;

  @decorate(ApiProperty({ type: "integer", description: "Pagina atual" }))
  currentPage: number;

  @decorate(ApiProperty({ type: "integer", description: "Quantidade total de paginas" }))
  totalPages: number;

  @decorate(ApiProperty({ type: "string", description: "Termo textual da busca" }))
  search: string;

  @decorate(
    ApiProperty({
      description: "Ordenacao aplicada",
      type: "array",
      items: {
        type: "array",
        items: { type: "string" },
        minItems: 2,
        maxItems: 2,
        example: ["nome", "ASC"],
      },
      example: [
        ["nome", "ASC"],
        ["dateCreated", "DESC"],
      ],
    }),
  )
  sortBy: [string, string][];

  @decorate(
    ApiPropertyOptional({
      description: "Filtros aplicados",
      type: "object",
      additionalProperties: true,
    }),
  )
  filter?: Record<string, string | string[]>;
}
