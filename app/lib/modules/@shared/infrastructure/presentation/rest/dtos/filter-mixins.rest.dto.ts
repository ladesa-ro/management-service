import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString, IsUUID } from "class-validator";
import { decorate } from "ts-mixer";
import { PaginationInputRestDto } from "./pagination-input.dto";
import { TransformToArray } from "./to-array.transform";

/**
 * Base para ListInput REST que inclui filtro por ID (UUID).
 * Praticamente todos os módulos usam "filter.id".
 */
export class PaginatedFilterByIdRestDto extends PaginationInputRestDto {
  @decorate(ApiPropertyOptional({ description: "Filtro por ID", type: "string", isArray: true }))
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.id"?: string[];
}

/**
 * Base para ListInput REST que inclui filtro por ID (string/numerico).
 * Usado por módulos como estado e cidade que não usam UUID.
 */
export class PaginatedFilterByStringIdRestDto extends PaginationInputRestDto {
  @decorate(ApiPropertyOptional({ description: "Filtro por ID", type: "string", isArray: true }))
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  "filter.id"?: string[];
}
