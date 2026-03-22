import {
  estadoFindOneInputSchema,
  estadoNomeSchema,
  estadoPaginationInputSchema,
  estadoSiglaSchema,
} from "@/modules/localidades/estado/domain/estado.schemas";
import { zodApiProperty } from "@/shared/presentation";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  RegisterModel,
  simpleProperty,
} from "@/shared/presentation/rest";
import { PaginationMetaRestDto } from "@/shared/presentation/rest/dtos";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "EstadoFindOneOutputDto" })
@RegisterModel({
  name: "EstadoFindOneQueryResult",
  properties: [simpleProperty("id"), simpleProperty("nome"), simpleProperty("sigla")],
})
export class EstadoFindOneOutputRestDto {
  @ApiProperty({ type: "integer", description: "Identificador do registro (numerico)" })
  id: number;

  @ApiProperty(zodApiProperty(estadoNomeSchema, { description: "Nome oficial do estado" }))
  nome: string;

  @ApiProperty(zodApiProperty(estadoSiglaSchema, { description: "Sigla do estado" }))
  sigla: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "EstadoListInputDto" })
export class EstadoListInputRestDto {
  static schema = estadoPaginationInputSchema;

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
}

@ApiSchema({ name: "EstadoListOutputDto" })
export class EstadoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [EstadoFindOneOutputRestDto], description: "Resultados da busca" })
  data: EstadoFindOneOutputRestDto[];
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "EstadoFindOneInputDto" })
export class EstadoFindOneInputRestDto {
  static schema = estadoFindOneInputSchema;

  @ApiProperty({ type: "integer", description: "Identificador do registro (numerico)" })
  id: number;
}
