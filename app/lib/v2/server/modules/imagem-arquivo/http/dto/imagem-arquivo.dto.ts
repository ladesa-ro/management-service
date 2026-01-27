import { ArgsType, Field, ID, InputType, Int, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";
import { PaginationInputDto, PaginationMetaDto, TransformToArray } from "@/shared/dto";
import { commonProperties, RegisterModel, simpleProperty } from "@/shared/metadata";
import { ArquivoFindOneOutputDto } from "@/v2/server/modules/arquivo/http/dto";

// ============================================================================
// Nested DTOs
// ============================================================================

@ObjectType("ImagemFindOneFromImagemArquivoOutput")
export class ImagemFindOneFromImagemArquivoOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("ImagemArquivo")
@RegisterModel({
  name: "ImagemArquivoFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("largura"),
    simpleProperty("altura"),
    simpleProperty("formato"),
    simpleProperty("mimeType"),
    simpleProperty("imagem"),
    simpleProperty("arquivo"),
    ...commonProperties.dated,
  ],
})
export class ImagemArquivoFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Largura da imagem" })
  @Field(() => Int)
  @IsInt()
  @Min(0)
  largura: number;

  @ApiProperty({ description: "Altura da imagem" })
  @Field(() => Int)
  @IsInt()
  @Min(0)
  altura: number;

  @ApiProperty({ description: "Formato da imagem", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  formato: string;

  @ApiProperty({ description: "Mime-type da imagem", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  mimeType: string;

  @ApiProperty({ description: "Imagem", type: () => ImagemFindOneFromImagemArquivoOutputDto })
  @Field(() => ImagemFindOneFromImagemArquivoOutputDto)
  @ValidateNested()
  @Type(() => ImagemFindOneFromImagemArquivoOutputDto)
  imagem: ImagemFindOneFromImagemArquivoOutputDto;

  @ApiProperty({ description: "Arquivo", type: () => ArquivoFindOneOutputDto })
  @Field(() => ArquivoFindOneOutputDto)
  @ValidateNested()
  @Type(() => ArquivoFindOneOutputDto)
  arquivo: ArquivoFindOneOutputDto;

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
// FindOneFromImagem Output (for nested use in Imagem)
// ============================================================================

@ObjectType("ImagemArquivoFindOneFromImagemOutput")
export class ImagemArquivoFindOneFromImagemOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Largura da imagem" })
  @Field(() => Int)
  @IsInt()
  @Min(0)
  largura: number;

  @ApiProperty({ description: "Altura da imagem" })
  @Field(() => Int)
  @IsInt()
  @Min(0)
  altura: number;

  @ApiProperty({ description: "Formato da imagem", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  formato: string;

  @ApiProperty({ description: "Mime-type da imagem", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  mimeType: string;

  @ApiProperty({ description: "Arquivo", type: () => ArquivoFindOneOutputDto })
  @Field(() => ArquivoFindOneOutputDto)
  @ValidateNested()
  @Type(() => ArquivoFindOneOutputDto)
  arquivo: ArquivoFindOneOutputDto;

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
@InputType("ImagemArquivoListInput")
export class ImagemArquivoListInputDto extends PaginationInputDto {
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
}

@ObjectType("ImagemArquivoListOutput")
export class ImagemArquivoListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [ImagemArquivoFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [ImagemArquivoFindOneOutputDto])
  data: ImagemArquivoFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("ImagemArquivoCreateInput")
export class ImagemArquivoCreateInputDto {
  @ApiProperty({ description: "Largura da imagem" })
  @Field(() => Int)
  @IsInt()
  @Min(0)
  largura: number;

  @ApiProperty({ description: "Altura da imagem" })
  @Field(() => Int)
  @IsInt()
  @Min(0)
  altura: number;

  @ApiProperty({ description: "Formato da imagem", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  formato: string;

  @ApiProperty({ description: "Mime-type da imagem", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  mimeType: string;

  @ApiProperty({ description: "ID da imagem", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  imagemId: string;

  @ApiProperty({ description: "ID do arquivo", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  arquivoId: string;
}

@InputType("ImagemArquivoUpdateInput")
export class ImagemArquivoUpdateInputDto extends PartialType(ImagemArquivoCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
export class ImagemArquivoFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
