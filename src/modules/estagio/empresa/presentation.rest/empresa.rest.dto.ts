import { Mixin } from "ts-mixer";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  commonProperties,
  PartialType,
  RegisterModel,
  simpleProperty,
  TransformToArray,
} from "@/modules/@shared/presentation/rest";
import { IsArray, IsOptional, IsString, IsUUID } from "@/modules/@shared/presentation/shared";
import { EmpresaFieldsMixin } from "../presentation.validations/empresa.validation-mixin";

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
export class EmpresaFindOneOutputRestDto extends Mixin(EntityBaseRestDto, EmpresaFieldsMixin) {
  @ApiProperty({ type: "string", description: "Razão social da empresa", minLength: 1 })
  declare razaoSocial: string;

  @ApiProperty({ type: "string", description: "Nome fantasia da empresa", minLength: 1 })
  declare nomeFantasia: string;

  @ApiProperty({ type: "string", description: "CNPJ sem pontuação", minLength: 14, maxLength: 14 })
  declare cnpj: string;

  @ApiProperty({ type: "string", description: "Telefone da empresa", minLength: 1, maxLength: 15 })
  declare telefone: string;

  @ApiProperty({ type: "string", description: "E-mail da empresa" })
  declare email: string;

  @ApiProperty({
    type: "string",
    format: "uuid",
    description: "ID do endereço vinculado à empresa",
  })
  declare idEnderecoFk: string;

  @ApiProperty({ type: "boolean", description: "Se a empresa está ativa" })
  ativo: boolean;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "EmpresaListInputDto" })
export class EmpresaListInputRestDto extends PaginatedFilterByIdRestDto {
  @ApiPropertyOptional({ type: "string", description: "Filtro por CNPJ", isArray: true })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.cnpj"?: string[];

  @ApiPropertyOptional({ type: "string", description: "Filtro por nome fantasia", isArray: true })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.nomeFantasia"?: string[];

  @ApiPropertyOptional({
    type: "string",
    format: "uuid",
    description: "Filtro por ID de endereço",
    isArray: true,
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
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
export class EmpresaCreateInputRestDto extends EmpresaFieldsMixin {
  @ApiProperty({ type: "string", description: "Razão social da empresa", minLength: 1 })
  declare razaoSocial: string;

  @ApiProperty({ type: "string", description: "Nome fantasia da empresa", minLength: 1 })
  declare nomeFantasia: string;

  @ApiProperty({ type: "string", description: "CNPJ sem pontuação", minLength: 14, maxLength: 14 })
  declare cnpj: string;

  @ApiProperty({ type: "string", description: "Telefone da empresa", minLength: 1, maxLength: 15 })
  declare telefone: string;

  @ApiProperty({ type: "string", description: "E-mail da empresa" })
  declare email: string;

  @ApiProperty({
    type: "string",
    format: "uuid",
    description: "ID do endereço vinculado à empresa",
  })
  declare idEnderecoFk: string;
}

@ApiSchema({ name: "EmpresaUpdateInputDto" })
export class EmpresaUpdateInputRestDto extends PartialType(EmpresaCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "EmpresaFindOneInputDto" })
export class EmpresaFindOneInputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}
