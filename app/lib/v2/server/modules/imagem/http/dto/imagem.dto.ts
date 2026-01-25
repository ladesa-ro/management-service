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
import { PaginationInputDto, PaginationMetaDto } from "@/shared/dto";
import { commonProperties, RegisterModel, simpleProperty } from "@/shared/metadata";
import { ImagemArquivoFindOneFromImagemOutputDto } from "@/v2/server/modules/imagem-arquivo/http/dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("Imagem")
@RegisterModel({
  name: "ImagemFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("descricao"),
    simpleProperty("versoes"),
    ...commonProperties.dated,
  ],
})
export class ImagemFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiPropertyOptional({ description: "Descrição da imagem", nullable: true, minLength: 1 })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
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
// List Input/Output
// ============================================================================

@ArgsType()
@InputType("ImagemListInput")
export class ImagemListInputDto extends PaginationInputDto {
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

@ObjectType("ImagemListOutput")
export class ImagemListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [ImagemFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [ImagemFindOneOutputDto])
  data: ImagemFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("ImagemCreateInput")
export class ImagemCreateInputDto {
  @ApiPropertyOptional({ description: "Descrição da imagem", nullable: true, minLength: 1 })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  descricao?: string | null;
}

@InputType("ImagemUpdateInput")
export class ImagemUpdateInputDto extends PartialType(ImagemCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
export class ImagemFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
