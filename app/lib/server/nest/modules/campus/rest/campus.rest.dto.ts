import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from "class-validator";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  PaginationInputRestDto,
  PaginationMetaRestDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  EnderecoFindOneOutputRestDto,
  EnderecoInputRestDto,
} from "@/server/nest/modules/endereco/rest";

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
export class CampusFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Nome fantasia do campus", minLength: 1 })
  @IsString()
  @MinLength(1)
  nomeFantasia: string;

  @ApiProperty({ description: "Razao social do campus", minLength: 1 })
  @IsString()
  @MinLength(1)
  razaoSocial: string;

  @ApiProperty({ description: "Apelido do campus", minLength: 1 })
  @IsString()
  @MinLength(1)
  apelido: string;

  @ApiProperty({ description: "CNPJ do campus", minLength: 1 })
  @IsString()
  @MinLength(1)
  cnpj: string;

  @ApiProperty({ type: () => EnderecoFindOneOutputRestDto, description: "Endereco do campus" })
  @ValidateNested()
  @Type(() => EnderecoFindOneOutputRestDto)
  endereco: EnderecoFindOneOutputRestDto;

  @ApiProperty({ description: "Data e hora da criacao do registro" })
  @IsDateString()
  dateCreated: Date;

  @ApiProperty({ description: "Data e hora da alteracao do registro" })
  @IsDateString()
  dateUpdated: Date;

  @ApiPropertyOptional({ description: "Data e hora da exclusao do registro", nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "CampusListInputDto" })
export class CampusListInputRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
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
  @ApiProperty({ description: "Nome fantasia do campus", minLength: 1 })
  @IsString()
  @MinLength(1)
  nomeFantasia: string;

  @ApiProperty({ description: "Razao social do campus", minLength: 1 })
  @IsString()
  @MinLength(1)
  razaoSocial: string;

  @ApiProperty({ description: "Apelido do campus", minLength: 1 })
  @IsString()
  @MinLength(1)
  apelido: string;

  @ApiProperty({ description: "CNPJ do campus", minLength: 1 })
  @IsString()
  @MinLength(1)
  cnpj: string;

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
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}
