import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, Min } from "class-validator";

/**
 * Base pagination input DTO for REST list queries.
 */
export class PaginationInputRestDto {
  // Index signature for filter properties (compatible with SearchOptions)
  [key: string]: string | number | string[] | null | undefined;

  @ApiPropertyOptional({
    description: "Pagina de consulta",
    minimum: 1,
    default: 1,
    example: 1,
  })
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
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({
    description: "Busca textual",
    example: "termo de busca",
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: "Ordenacao (ex: dateCreated:ASC)",
    isArray: true,
    type: String,
    example: ["dateCreated:ASC"],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sortBy?: string[];

  @ApiPropertyOptional({
    description: "Seleção de campos",
    isArray: true,
    type: String,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  selection?: string[];
}
