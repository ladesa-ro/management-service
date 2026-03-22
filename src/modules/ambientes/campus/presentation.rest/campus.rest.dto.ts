import {
  EnderecoFindOneOutputRestDto,
  EnderecoInputRestDto,
} from "@/modules/localidades/endereco/presentation.rest";
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
  campusFindOneInputSchema,
  campusInputCreateSchema,
  campusInputUpdateSchema,
  campusPaginationInputSchema,
} from "../domain/campus.schemas";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "CampusFindOneOutputDto" })
@RegisterModel({
  name: "CampusFindOneQueryResult",
  properties: [
    simpleProperty("id"),
    simpleProperty("nomeFantasia"),
    simpleProperty("razaoSocial"),
    simpleProperty("apelido"),
    simpleProperty("cnpj"),
    referenceProperty("endereco", "EnderecoFindOneQueryResult"),
    ...commonProperties.dated,
  ],
})
export class CampusFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({ type: "string", description: "Nome fantasia do campus", minLength: 1 })
  nomeFantasia: string;

  @ApiProperty({ type: "string", description: "Razao social do campus", minLength: 1 })
  razaoSocial: string;

  @ApiProperty({ type: "string", description: "Apelido do campus", minLength: 1 })
  apelido: string;

  @ApiProperty({ type: "string", description: "CNPJ do campus", minLength: 1 })
  cnpj: string;

  @ApiProperty({ type: () => EnderecoFindOneOutputRestDto, description: "Endereco do campus" })
  endereco: EnderecoFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "CampusListInputDto" })
export class CampusListInputRestDto {
  static schema = campusPaginationInputSchema;

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

@ApiSchema({ name: "CampusListOutputDto" })
export class CampusListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [CampusFindOneOutputRestDto], description: "Resultados da busca" })
  data: CampusFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "CampusCreateInputDto" })
export class CampusCreateInputRestDto {
  static schema = campusInputCreateSchema;

  @ApiProperty({ type: "string", description: "Nome fantasia do campus", minLength: 1 })
  nomeFantasia: string;

  @ApiProperty({ type: "string", description: "Razao social do campus", minLength: 1 })
  razaoSocial: string;

  @ApiProperty({ type: "string", description: "Apelido do campus", minLength: 1 })
  apelido: string;

  @ApiProperty({ type: "string", description: "CNPJ do campus", minLength: 1 })
  cnpj: string;

  @ApiProperty({ type: () => EnderecoInputRestDto, description: "Endereco do campus" })
  endereco: EnderecoInputRestDto;
}

@ApiSchema({ name: "CampusUpdateInputDto" })
export class CampusUpdateInputRestDto {
  static schema = campusInputUpdateSchema;

  @ApiPropertyOptional({ type: "string", description: "Nome fantasia do campus", minLength: 1 })
  nomeFantasia?: string;

  @ApiPropertyOptional({ type: "string", description: "Razao social do campus", minLength: 1 })
  razaoSocial?: string;

  @ApiPropertyOptional({ type: "string", description: "Apelido do campus", minLength: 1 })
  apelido?: string;

  @ApiPropertyOptional({ type: "string", description: "CNPJ do campus", minLength: 1 })
  cnpj?: string;

  @ApiPropertyOptional({ type: () => EnderecoInputRestDto, description: "Endereco do campus" })
  endereco?: EnderecoInputRestDto;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "CampusFindOneInputDto" })
export class CampusFindOneInputRestDto {
  static schema = campusFindOneInputSchema;

  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  id: string;
}
