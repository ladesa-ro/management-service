import { ArgsType, Field, ID, InputType, ObjectType, PartialType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
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
  PaginationInputDto,
  PaginationMetaDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { EnderecoFindOneOutputDto, EnderecoInputDto } from "@/server/nest/modules/endereco/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("Campus")
@RegisterModel({
  name: "CampusFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("nomeFantasia"),
    simpleProperty("razaoSocial"),
    simpleProperty("apelido"),
    simpleProperty("cnpj"),
    referenceProperty("endereco", "EnderecoFindOneOutput"),
    ...commonProperties.dated,
  ],
})
export class CampusFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Nome fantasia do campus", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nomeFantasia: string;

  @ApiProperty({ description: "Razao social do campus", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  razaoSocial: string;

  @ApiProperty({ description: "Apelido do campus", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  apelido: string;

  @ApiProperty({ description: "CNPJ do campus", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  cnpj: string;

  @ApiProperty({ type: () => EnderecoFindOneOutputDto, description: "Endereco do campus" })
  @Field(() => EnderecoFindOneOutputDto)
  @ValidateNested()
  @Type(() => EnderecoFindOneOutputDto)
  endereco: EnderecoFindOneOutputDto;

  @ApiProperty({ description: "Data e hora da criacao do registro" })
  @Field()
  @IsDateString()
  dateCreated: Date;

  @ApiProperty({ description: "Data e hora da alteracao do registro" })
  @Field()
  @IsDateString()
  dateUpdated: Date;

  @ApiPropertyOptional({ description: "Data e hora da exclusao do registro", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ArgsType()
export class CampusListInputDto extends PaginationInputDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];
}

@ObjectType("CampusListOutput")
export class CampusListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [CampusFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [CampusFindOneOutputDto])
  data: CampusFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("CampusCreateInput")
export class CampusCreateInputDto {
  @ApiProperty({ description: "Nome fantasia do campus", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nomeFantasia: string;

  @ApiProperty({ description: "Razao social do campus", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  razaoSocial: string;

  @ApiProperty({ description: "Apelido do campus", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  apelido: string;

  @ApiProperty({ description: "CNPJ do campus", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  cnpj: string;

  @ApiProperty({ type: () => EnderecoInputDto, description: "Endereco do campus" })
  @Field(() => EnderecoInputDto)
  @ValidateNested()
  @Type(() => EnderecoInputDto)
  endereco: EnderecoInputDto;
}

@InputType("CampusUpdateInput")
export class CampusUpdateInputDto extends PartialType(CampusCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("CampusFindOneInput")
export class CampusFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
