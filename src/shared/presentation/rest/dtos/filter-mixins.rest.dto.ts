import { ApiPropertyOptional, TransformToArray } from "@/shared/presentation/rest";
import { PaginationInputRestDto } from "./pagination-input.dto";
/**
 * Base para ListInput REST que inclui filtro por ID (UUID).
 * Praticamente todos os módulos usam "filter.id".
 */

export class PaginatedFilterByIdRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({ description: "Filtro por ID", type: "string", isArray: true })
  @TransformToArray()
  "filter.id"?: string[];
}

/**
 * Base para ListInput REST que inclui filtro por ID (string/numerico).
 * Usado por módulos como estado e cidade que não usam UUID.
 */

export class PaginatedFilterByStringIdRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({ description: "Filtro por ID", type: "string", isArray: true })
  @TransformToArray()
  "filter.id"?: string[];
}
