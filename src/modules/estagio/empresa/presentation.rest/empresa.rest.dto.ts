import {
  empresaCreateSchema,
  empresaFindOneInputSchema,
  empresaPaginationInputSchema,
  empresaUpdateSchema,
} from "@/modules/estagio/empresa/domain/empresa.schemas";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  commonProperties,
  RegisterModel,
  simpleProperty,
  TransformToArray,
} from "@/shared/presentation/rest";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/shared/presentation/rest/dtos";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "EmpresaFindOneOutputDto" })
@RegisterModel({
  name: "EmpresaFindOneQueryResult",
  properties: [
    simpleProperty("id"),
    simpleProperty("razaoSocial"),
    simpleProperty("nomeFantasia"),
    simpleProperty("cnpj"),
    simpleProperty("telefone"),
    simpleProperty("email"),
    simpleProperty("idEnderecoFk"),
    simpleProperty("ativo"),
    ...commonProperties.dated,
  ],
})
export class EmpresaFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({ type: "string", description: "Razão social da empresa", minLength: 1 })
  razaoSocial: string;

  @ApiProperty({ type: "string", description: "Nome fantasia da empresa", minLength: 1 })
  nomeFantasia: string;

  @ApiProperty({ type: "string", description: "CNPJ sem pontuação", minLength: 14, maxLength: 14 })
  cnpj: string;

  @ApiProperty({ type: "string", description: "Telefone da empresa", minLength: 1, maxLength: 15 })
  telefone: string;

  @ApiProperty({ type: "string", description: "E-mail da empresa" })
  email: string;

  @ApiProperty({
    type: "string",
    format: "uuid",
    description: "ID do endereço vinculado à empresa",
  })
  idEnderecoFk: string;

  @ApiProperty({ type: "boolean", description: "Se a empresa está ativa" })
  ativo: boolean;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "EmpresaListInputDto" })
export class EmpresaListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = empresaPaginationInputSchema;

  @ApiPropertyOptional({ type: "string", description: "Filtro por CNPJ", isArray: true })
  @TransformToArray()
  "filter.cnpj"?: string[];

  @ApiPropertyOptional({ type: "string", description: "Filtro por nome fantasia", isArray: true })
  @TransformToArray()
  "filter.nomeFantasia"?: string[];

  @ApiPropertyOptional({
    type: "string",
    format: "uuid",
    description: "Filtro por ID de endereço",
    isArray: true,
  })
  @TransformToArray()
  "filter.idEnderecoFk"?: string[];
}

@ApiSchema({ name: "EmpresaListOutputDto" })
export class EmpresaListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [EmpresaFindOneOutputRestDto], description: "Resultados da busca" })
  data: EmpresaFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "EmpresaCreateInputDto" })
export class EmpresaCreateInputRestDto {
  static schema = empresaCreateSchema;

  @ApiProperty({ type: "string", description: "Razão social da empresa", minLength: 1 })
  razaoSocial: string;

  @ApiProperty({ type: "string", description: "Nome fantasia da empresa", minLength: 1 })
  nomeFantasia: string;

  @ApiProperty({ type: "string", description: "CNPJ sem pontuação", minLength: 14, maxLength: 14 })
  cnpj: string;

  @ApiProperty({ type: "string", description: "Telefone da empresa", minLength: 1, maxLength: 15 })
  telefone: string;

  @ApiProperty({ type: "string", description: "E-mail da empresa" })
  email: string;

  @ApiProperty({
    type: "string",
    format: "uuid",
    description: "ID do endereço vinculado à empresa",
  })
  idEnderecoFk: string;
}

@ApiSchema({ name: "EmpresaUpdateInputDto" })
export class EmpresaUpdateInputRestDto {
  static schema = empresaUpdateSchema;

  @ApiPropertyOptional({ type: "string", description: "Razão social da empresa", minLength: 1 })
  razaoSocial?: string;

  @ApiPropertyOptional({ type: "string", description: "Nome fantasia da empresa", minLength: 1 })
  nomeFantasia?: string;

  @ApiPropertyOptional({
    type: "string",
    description: "CNPJ sem pontuação",
    minLength: 14,
    maxLength: 14,
  })
  cnpj?: string;

  @ApiPropertyOptional({
    type: "string",
    description: "Telefone da empresa",
    minLength: 1,
    maxLength: 15,
  })
  telefone?: string;

  @ApiPropertyOptional({ type: "string", description: "E-mail da empresa" })
  email?: string;

  @ApiPropertyOptional({
    type: "string",
    format: "uuid",
    description: "ID do endereço vinculado à empresa",
  })
  idEnderecoFk?: string;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "EmpresaFindOneInputDto" })
export class EmpresaFindOneInputRestDto {
  static schema = empresaFindOneInputSchema;

  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  id: string;
}
