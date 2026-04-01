import { SharedFields } from "@/domain/abstractions";
import { ApiProperty, ApiPropertyOptional } from "@/shared/presentation/rest";
/**
 * Pagination metadata DTO for REST.
 */

export class PaginationMetaRestDto {
  @ApiProperty(SharedFields.limit.swaggerMetadata)
  itemsPerPage: number;

  @ApiProperty({ type: "integer", description: "Total de itens" })
  totalItems: number;

  @ApiProperty(SharedFields.page.swaggerMetadata)
  currentPage: number;

  @ApiProperty({ type: "integer", description: "Quantidade total de paginas" })
  totalPages: number;

  @ApiProperty(SharedFields.search.swaggerMetadata)
  search: string;

  @ApiProperty({
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
  })
  sortBy: [string, string][];

  @ApiPropertyOptional({
    description: "Filtros aplicados",
    type: "object",
    additionalProperties: true,
  })
  filter?: Record<string, string | string[]>;
}
