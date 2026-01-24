import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { ArgsType, Field, ID, ObjectType, InputType } from "@nestjs/graphql";
import { IsUUID, IsString, MinLength, IsDateString, IsOptional, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PaginationInputDto, PaginationMetaDto } from "@/shared/dto";
import {
  RegisterModel,
  simpleProperty,
  referenceProperty,
  commonProperties,
} from "@/shared/metadata";
import { CampusFindOneOutputDto, CampusFindOneInputDto } from "@/v2/core/campus/dto";
import { OfertaFormacaoFindOneOutputDto, OfertaFormacaoFindOneInputDto } from "@/v2/core/oferta-formacao/dto";
import { ImagemFindOneOutputDto } from "@/v2/core/bloco/dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("Curso")
@RegisterModel({
  name: "CursoFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("nomeAbreviado"),
    referenceProperty("campus", "CampusFindOneOutput"),
    referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneOutput"),
    referenceProperty("imagemCapa", "ImagemFindOneOutput", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class CursoFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Nome do curso", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiProperty({ description: "Nome abreviado do curso", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nomeAbreviado: string;

  @ApiProperty({ type: () => CampusFindOneOutputDto, description: "Campus que o curso pertence" })
  @Field(() => CampusFindOneOutputDto)
  @ValidateNested()
  @Type(() => CampusFindOneOutputDto)
  campus: CampusFindOneOutputDto;

  @ApiProperty({ type: () => OfertaFormacaoFindOneOutputDto, description: "Oferta de formacao do curso" })
  @Field(() => OfertaFormacaoFindOneOutputDto)
  @ValidateNested()
  @Type(() => OfertaFormacaoFindOneOutputDto)
  ofertaFormacao: OfertaFormacaoFindOneOutputDto;

  @ApiPropertyOptional({ type: () => ImagemFindOneOutputDto, description: "Imagem de capa do curso", nullable: true })
  @Field(() => ImagemFindOneOutputDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemFindOneOutputDto)
  imagemCapa: ImagemFindOneOutputDto | null;

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
@InputType("CursoListInput")
export class CursoListInputDto extends PaginationInputDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];
}

@ObjectType("CursoListOutput")
export class CursoListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [CursoFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [CursoFindOneOutputDto])
  data: CursoFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("CursoCreateInput")
export class CursoCreateInputDto {
  @ApiProperty({ description: "Nome do curso", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiProperty({ description: "Nome abreviado do curso", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nomeAbreviado: string;

  @ApiProperty({ type: () => CampusFindOneInputDto, description: "Campus que o curso pertence" })
  @Field(() => CampusFindOneInputDto)
  @ValidateNested()
  @Type(() => CampusFindOneInputDto)
  campus: CampusFindOneInputDto;

  @ApiProperty({ type: () => OfertaFormacaoFindOneInputDto, description: "Oferta de formacao do curso" })
  @Field(() => OfertaFormacaoFindOneInputDto)
  @ValidateNested()
  @Type(() => OfertaFormacaoFindOneInputDto)
  ofertaFormacao: OfertaFormacaoFindOneInputDto;
}

@InputType("CursoUpdateInput")
export class CursoUpdateInputDto extends PartialType(CursoCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("CursoFindOneInput")
export class CursoFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
