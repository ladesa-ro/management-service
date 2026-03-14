import { ApiPropertyOptional, TransformToArray } from "@/modules/@shared/presentation/rest";
import { IsArray, IsOptional, IsString, IsUUID } from "@/modules/@shared/presentation/shared";
import { PaginationInputRestDto } from "./pagination-input.dto";
/**
 * Base para ListInput REST que inclui filtro por ID (UUID).
 * Praticamente todos os módulos usam "filter.id".
 */
export class PaginatedFilterByIdRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({ description: "Filtro por ID", type: "string", isArray: true })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.id"?: string[];
}

/**
 * Base para ListInput REST que inclui filtro por ID (string/numerico).
 * Usado por módulos como estado e cidade que não usam UUID.
 */
export class PaginatedFilterByStringIdRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({ description: "Filtro por ID", type: "string", isArray: true })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];
}
