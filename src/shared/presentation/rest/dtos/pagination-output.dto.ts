import { SharedPaginationOutputFields } from "@/domain/abstractions";
import { ApiProperty, ApiPropertyOptional } from "@/shared/presentation/rest";
/**
 * Pagination metadata DTO for REST.
 */

export class PaginationMetaRestDto {
  @ApiProperty(SharedPaginationOutputFields.itemsPerPage.swaggerMetadata)
  itemsPerPage: number;

  @ApiProperty(SharedPaginationOutputFields.totalItems.swaggerMetadata)
  totalItems: number;

  @ApiProperty(SharedPaginationOutputFields.currentPage.swaggerMetadata)
  currentPage: number;

  @ApiProperty(SharedPaginationOutputFields.totalPages.swaggerMetadata)
  totalPages: number;

  @ApiProperty(SharedPaginationOutputFields.search.swaggerMetadata)
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
