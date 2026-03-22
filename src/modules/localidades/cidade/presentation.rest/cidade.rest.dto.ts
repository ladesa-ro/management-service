import {
  cidadeFindOneInputSchema,
  cidadePaginationInputSchema,
} from "@/modules/localidades/cidade/domain/cidade.schemas";
import { EstadoFindOneOutputRestDto } from "@/modules/localidades/estado/presentation.rest/estado.rest.dto";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/shared/presentation/rest";
import { PaginationMetaRestDto } from "@/shared/presentation/rest/dtos";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "CidadeFindOneOutputDto" })
@RegisterModel({
  name: "CidadeFindOneQueryResult",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    referenceProperty("estado", "EstadoFindOneQueryResult"),
  ],
})
export class CidadeFindOneOutputRestDto {
  @ApiProperty({ type: "integer", description: "Identificador do registro (numerico)" })
  id: number;

  @ApiProperty({ type: "string", description: "Nome oficial da cidade" })
  nome: string;

  @ApiProperty({ type: () => EstadoFindOneOutputRestDto, description: "Estado da cidade" })
  estado: EstadoFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "CidadeListInputDto" })
export class CidadeListInputRestDto {
  static schema = cidadePaginationInputSchema;

  [key: string]: string | number | string[] | null | undefined;

  @ApiPropertyOptional({
    type: "integer",
    description: "Pagina de consulta",
    minimum: 1,
    default: 1,
  })
  page?: number = 1;

  @ApiPropertyOptional({
    type: "integer",
    description: "Limite da quantidade de resultados por pagina",
    minimum: 1,
  })
  limit?: number;

  @ApiPropertyOptional({ type: "string", description: "Busca textual" })
  search?: string;

  @ApiPropertyOptional({ description: "Ordenacao (ex: nome:ASC)", isArray: true, type: "string" })
  sortBy?: string[];

  @ApiPropertyOptional({ description: "Seleção de campos", isArray: true, type: "string" })
  selection?: string[];

  @ApiPropertyOptional({ description: "Filtro por ID", type: "string", isArray: true })
  "filter.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Estado",
    type: "string",
    isArray: true,
  })
  "filter.estado.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por nome do Estado",
    type: "string",
    isArray: true,
  })
  "filter.estado.nome"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por sigla do Estado",
    type: "string",
    isArray: true,
  })
  "filter.estado.sigla"?: string[];
}

@ApiSchema({ name: "CidadeListOutputDto" })
export class CidadeListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [CidadeFindOneOutputRestDto], description: "Resultados da busca" })
  data: CidadeFindOneOutputRestDto[];
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "CidadeFindOneInputDto" })
export class CidadeFindOneInputRestDto {
  static schema = cidadeFindOneInputSchema;

  @ApiProperty({ type: "integer", description: "Identificador do registro (numerico)" })
  id: number;
}
