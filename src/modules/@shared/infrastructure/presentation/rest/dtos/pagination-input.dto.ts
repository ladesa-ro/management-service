import { ApiPropertyOptional } from "@/modules/@shared/presentation/rest";
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Min,
  Type,
} from "@/modules/@shared/presentation/shared";
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
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    type: "integer",
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
    type: "string",
    description: "Busca textual",
    example: "termo de busca",
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: "Ordenacao (ex: dateCreated:ASC)",
    isArray: true,
    type: "string",
    example: ["dateCreated:ASC"],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sortBy?: string[];

  @ApiPropertyOptional({
    description: "Seleção de campos",
    isArray: true,
    type: "string",
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  selection?: string[];
}
