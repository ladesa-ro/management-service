import {
  BlocoFindOneOutputRestDto,
  ImagemFindOneOutputRestDto,
} from "@/modules/ambientes/bloco/presentation.rest";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/shared/presentation/rest";
import { EntityBaseRestDto, PaginationMetaRestDto } from "@/shared/presentation/rest/dtos";
import {
  ambienteFindOneInputSchema,
  ambienteInputCreateSchema,
  ambienteInputUpdateSchema,
  ambientePaginationInputSchema,
} from "../domain/ambiente.schemas";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "AmbienteFindOneOutputDto" })
@RegisterModel({
  name: "AmbienteFindOneQueryResult",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("descricao", { nullable: true }),
    simpleProperty("codigo"),
    simpleProperty("capacidade", { nullable: true }),
    simpleProperty("tipo", { nullable: true }),
    referenceProperty("bloco", "BlocoFindOneQueryResult"),
    referenceProperty("imagemCapa", "ImagemFindOneQueryResult", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class AmbienteFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({ type: "string", description: "Nome do ambiente/sala", minLength: 1 })
  nome: string;

  @ApiPropertyOptional({
    type: "string",
    description: "Descricao do ambiente/sala",
    nullable: true,
  })
  descricao: string | null;

  @ApiProperty({ type: "string", description: "Codigo do ambiente/sala", minLength: 1 })
  codigo: string;

  @ApiPropertyOptional({
    type: "integer",
    description: "Capacidade do ambiente/sala",
    nullable: true,
  })
  capacidade: number | null;

  @ApiPropertyOptional({
    type: "string",
    description: "Tipo do ambiente/sala. Ex.: sala aula, auditorio, laboratorio de quimica",
    nullable: true,
  })
  tipo: string | null;

  @ApiProperty({
    type: () => BlocoFindOneOutputRestDto,
    description: "Bloco que o ambiente/sala pertence",
  })
  bloco: BlocoFindOneOutputRestDto;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    description: "Imagem de capa do ambiente",
    nullable: true,
  })
  imagemCapa: ImagemFindOneOutputRestDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "AmbienteListInputDto" })
export class AmbienteListInputRestDto {
  static schema = ambientePaginationInputSchema;

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
    description: "Filtro por ID do Bloco",
    type: "string",
    isArray: true,
  })
  "filter.bloco.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Campus do Bloco",
    type: "string",
    isArray: true,
  })
  "filter.bloco.campus.id"?: string[];
}

@ApiSchema({ name: "AmbienteListOutputDto" })
export class AmbienteListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [AmbienteFindOneOutputRestDto], description: "Resultados da busca" })
  data: AmbienteFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "AmbienteBlocoRefInputDto" })
export class AmbienteBlocoRefInputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do bloco (uuid)",
    format: "uuid",
  })
  id: string;
}

@ApiSchema({ name: "AmbienteCreateInputDto" })
export class AmbienteCreateInputRestDto {
  static schema = ambienteInputCreateSchema;

  @ApiProperty({ type: "string", description: "Nome do ambiente/sala", minLength: 1 })
  nome: string;

  @ApiPropertyOptional({
    type: "string",
    description: "Descricao do ambiente/sala",
    nullable: true,
  })
  descricao?: string | null;

  @ApiProperty({ type: "string", description: "Codigo do ambiente/sala", minLength: 1 })
  codigo: string;

  @ApiPropertyOptional({
    type: "integer",
    description: "Capacidade do ambiente/sala",
    nullable: true,
  })
  capacidade?: number | null;

  @ApiPropertyOptional({
    type: "string",
    description: "Tipo do ambiente/sala. Ex.: sala aula, auditorio, laboratorio de quimica",
    nullable: true,
  })
  tipo?: string | null;

  @ApiProperty({
    type: () => AmbienteBlocoRefInputRestDto,
    description: "Bloco que o ambiente/sala pertence",
  })
  bloco: AmbienteBlocoRefInputRestDto;
}

@ApiSchema({ name: "AmbienteUpdateInputDto" })
export class AmbienteUpdateInputRestDto {
  static schema = ambienteInputUpdateSchema;

  @ApiPropertyOptional({ type: "string", description: "Nome do ambiente/sala", minLength: 1 })
  nome?: string;

  @ApiPropertyOptional({
    type: "string",
    description: "Descricao do ambiente/sala",
    nullable: true,
  })
  descricao?: string | null;

  @ApiPropertyOptional({ type: "string", description: "Codigo do ambiente/sala", minLength: 1 })
  codigo?: string;

  @ApiPropertyOptional({
    type: "integer",
    description: "Capacidade do ambiente/sala",
    nullable: true,
  })
  capacidade?: number | null;

  @ApiPropertyOptional({
    type: "string",
    description: "Tipo do ambiente/sala. Ex.: sala aula, auditorio, laboratorio de quimica",
    nullable: true,
  })
  tipo?: string | null;

  @ApiPropertyOptional({
    type: () => AmbienteBlocoRefInputRestDto,
    description: "Bloco que o ambiente/sala pertence",
  })
  bloco?: AmbienteBlocoRefInputRestDto;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "AmbienteFindOneInputDto" })
export class AmbienteFindOneInputRestDto {
  static schema = ambienteFindOneInputSchema;

  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  id: string;
}
