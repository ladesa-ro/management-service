import { ArgsType, Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
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
import { PaginationInputDto, PaginationMetaDto, TransformToArray } from "@/v2/old/shared/dto";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/v2/old/shared/metadata";
import { CampusFindOneInputDto, CampusFindOneOutputDto } from "@/v2/server/modules/campus/http/dto";

// ============================================================================
// Imagem Stub DTOs (forward reference until imagem module has DTOs)
// ============================================================================

@ObjectType("ArquivoFindOneOutputFromBloco")
export class ArquivoFindOneOutputFromBlocoDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}

@ObjectType("ImagemArquivoFindOneFromImagem")
export class ImagemArquivoFindOneFromImagemOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Largura da imagem" })
  @Field()
  largura: number | null;

  @ApiProperty({ description: "Altura da imagem" })
  @Field()
  altura: number | null;

  @ApiProperty({ description: "Formato da imagem" })
  @Field()
  @IsString()
  formato: string | null;

  @ApiProperty({ description: "Mime-type da imagem" })
  @Field()
  @IsString()
  mimeType: string | null;

  @ApiProperty({ description: "Arquivo", type: () => ArquivoFindOneOutputFromBlocoDto })
  @Field(() => ArquivoFindOneOutputFromBlocoDto)
  @ValidateNested()
  @Type(() => ArquivoFindOneOutputFromBlocoDto)
  arquivo: ArquivoFindOneOutputFromBlocoDto;
}

@ObjectType("ImagemFindOneOutputFromBloco")
export class ImagemFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiPropertyOptional({ description: "Descricao da imagem", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  descricao: string | null;

  @ApiProperty({
    description: "Versões da imagem",
    type: () => [ImagemArquivoFindOneFromImagemOutputDto],
  })
  @Field(() => [ImagemArquivoFindOneFromImagemOutputDto])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImagemArquivoFindOneFromImagemOutputDto)
  versoes: ImagemArquivoFindOneFromImagemOutputDto[];

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
// FindOne Output
// ============================================================================

@ObjectType("Bloco")
@RegisterModel({
  name: "BlocoFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("codigo"),
    referenceProperty("campus", "CampusFindOneOutput"),
    referenceProperty("imagemCapa", "ImagemFindOneOutput", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class BlocoFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Nome do bloco", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiProperty({ description: "Codigo do bloco", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  codigo: string;

  @ApiProperty({ type: () => CampusFindOneOutputDto, description: "Campus do bloco" })
  @Field(() => CampusFindOneOutputDto)
  @ValidateNested()
  @Type(() => CampusFindOneOutputDto)
  campus: CampusFindOneOutputDto;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputDto,
    description: "Imagem de capa do bloco",
    nullable: true,
  })
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
@InputType("BlocoListInput")
export class BlocoListInputDto extends PaginationInputDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID de Campus",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.campus.id"?: string[];
}

@ObjectType("BlocoListOutput")
export class BlocoListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [BlocoFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [BlocoFindOneOutputDto])
  data: BlocoFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("BlocoCreateInput")
export class BlocoCreateInputDto {
  @ApiProperty({ description: "Nome do bloco", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiProperty({ description: "Codigo do bloco", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  codigo: string;

  @ApiProperty({ type: () => CampusFindOneInputDto, description: "Campus do bloco" })
  @Field(() => CampusFindOneInputDto)
  @ValidateNested()
  @Type(() => CampusFindOneInputDto)
  campus: CampusFindOneInputDto;
}

@InputType("BlocoUpdateInput")
export class BlocoUpdateInputDto extends PartialType(BlocoCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("BlocoFindOneInput")
export class BlocoFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
