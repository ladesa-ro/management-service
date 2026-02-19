import { ApiProperty, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsUUID, ValidateNested } from "class-validator";
import { decorate, Mixin } from "ts-mixer";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  EnderecoFindOneOutputRestDto,
  EnderecoInputRestDto,
} from "@/modules/localidades/endereco/presentation/rest";
import { CampusFieldsMixin } from "../campus.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "CampusFindOneOutputDto" }))
@decorate(
  RegisterModel({
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
  }),
)
export class CampusFindOneOutputRestDto extends Mixin(EntityBaseRestDto, CampusFieldsMixin) {
  @decorate(ApiProperty({ type: "string", description: "Nome fantasia do campus", minLength: 1 }))
  declare nomeFantasia: string;

  @decorate(ApiProperty({ type: "string", description: "Razao social do campus", minLength: 1 }))
  declare razaoSocial: string;

  @decorate(ApiProperty({ type: "string", description: "Apelido do campus", minLength: 1 }))
  declare apelido: string;

  @decorate(ApiProperty({ type: "string", description: "CNPJ do campus", minLength: 1 }))
  declare cnpj: string;

  @decorate(
    ApiProperty({ type: () => EnderecoFindOneOutputRestDto, description: "Endereco do campus" }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => EnderecoFindOneOutputRestDto))
  endereco: EnderecoFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "CampusListInputDto" }))
export class CampusListInputRestDto extends PaginatedFilterByIdRestDto {}

@decorate(ApiSchema({ name: "CampusListOutputDto" }))
export class CampusListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({ type: () => [CampusFindOneOutputRestDto], description: "Resultados da busca" }),
  )
  data: CampusFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "CampusCreateInputDto" }))
export class CampusCreateInputRestDto extends CampusFieldsMixin {
  @decorate(ApiProperty({ type: "string", description: "Nome fantasia do campus", minLength: 1 }))
  declare nomeFantasia: string;

  @decorate(ApiProperty({ type: "string", description: "Razao social do campus", minLength: 1 }))
  declare razaoSocial: string;

  @decorate(ApiProperty({ type: "string", description: "Apelido do campus", minLength: 1 }))
  declare apelido: string;

  @decorate(ApiProperty({ type: "string", description: "CNPJ do campus", minLength: 1 }))
  declare cnpj: string;

  @decorate(ApiProperty({ type: () => EnderecoInputRestDto, description: "Endereco do campus" }))
  @decorate(ValidateNested())
  @decorate(Type(() => EnderecoInputRestDto))
  endereco: EnderecoInputRestDto;
}

@decorate(ApiSchema({ name: "CampusUpdateInputDto" }))
export class CampusUpdateInputRestDto extends PartialType(CampusCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "CampusFindOneInputDto" }))
export class CampusFindOneInputRestDto {
  @decorate(
    ApiProperty({
      type: "string",
      description: "Identificador do registro (uuid)",
      format: "uuid",
    }),
  )
  @decorate(IsUUID())
  id: string;
}
