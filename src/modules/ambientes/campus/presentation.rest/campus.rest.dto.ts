import { Mixin } from "ts-mixer";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  ApiProperty,
  ApiSchema,
  commonProperties,
  PartialType,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/presentation/rest";
import { IsUUID, Type, ValidateNested } from "@/modules/@shared/presentation/shared";
import {
  EnderecoFindOneOutputRestDto,
  EnderecoInputRestDto,
} from "@/modules/localidades/endereco/presentation.rest";
import { CampusFieldsMixin } from "../presentation.validations/campus.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "CampusFindOneOutputDto" })
@RegisterModel({
  name: "CampusFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("nomeFantasia"),
    simpleProperty("razaoSocial"),
    simpleProperty("apelido"),
    simpleProperty("cnpj"),
    referenceProperty("endereco", "EnderecoFindOneOutputDto"),
    ...commonProperties.dated,
  ],
})
export class CampusFindOneOutputRestDto extends Mixin(EntityBaseRestDto, CampusFieldsMixin) {
  @ApiProperty({ type: "string", description: "Nome fantasia do campus", minLength: 1 })
  declare nomeFantasia: string;

  @ApiProperty({ type: "string", description: "Razao social do campus", minLength: 1 })
  declare razaoSocial: string;

  @ApiProperty({ type: "string", description: "Apelido do campus", minLength: 1 })
  declare apelido: string;

  @ApiProperty({ type: "string", description: "CNPJ do campus", minLength: 1 })
  declare cnpj: string;

  @ApiProperty({ type: () => EnderecoFindOneOutputRestDto, description: "Endereco do campus" })
  @ValidateNested()
  @Type(() => EnderecoFindOneOutputRestDto)
  endereco: EnderecoFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "CampusListInputDto" })
export class CampusListInputRestDto extends PaginatedFilterByIdRestDto {}

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
export class CampusCreateInputRestDto extends CampusFieldsMixin {
  @ApiProperty({ type: "string", description: "Nome fantasia do campus", minLength: 1 })
  declare nomeFantasia: string;

  @ApiProperty({ type: "string", description: "Razao social do campus", minLength: 1 })
  declare razaoSocial: string;

  @ApiProperty({ type: "string", description: "Apelido do campus", minLength: 1 })
  declare apelido: string;

  @ApiProperty({ type: "string", description: "CNPJ do campus", minLength: 1 })
  declare cnpj: string;

  @ApiProperty({ type: () => EnderecoInputRestDto, description: "Endereco do campus" })
  @ValidateNested()
  @Type(() => EnderecoInputRestDto)
  endereco: EnderecoInputRestDto;
}

@ApiSchema({ name: "CampusUpdateInputDto" })
export class CampusUpdateInputRestDto extends PartialType(CampusCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "CampusFindOneInputDto" })
export class CampusFindOneInputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}
