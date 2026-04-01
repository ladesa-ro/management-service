import { SharedFields } from "@/domain/abstractions";
import { ApiPropertyOptional } from "@/shared/presentation/rest";
/**
 * Base pagination input DTO for REST list queries.
 */

export class PaginationInputRestDto {
  @ApiPropertyOptional(SharedFields.page.swaggerMetadata)
  page?: number;

  @ApiPropertyOptional(SharedFields.limit.swaggerMetadata)
  limit?: number;

  @ApiPropertyOptional(SharedFields.search.swaggerMetadata)
  search?: string;

  @ApiPropertyOptional(SharedFields.sortBy.swaggerMetadata)
  sortBy?: string[];
}
