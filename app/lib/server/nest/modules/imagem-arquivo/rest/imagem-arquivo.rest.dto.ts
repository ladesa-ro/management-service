import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
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
import {
  commonProperties,
  RegisterModel,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  PaginationInputRestDto,
  PaginationMetaRestDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { ArquivoFindOneOutputRestDto } from "@/server/nest/modules/arquivo/rest/arquivo.rest.dto";

// ============================================================================
// Nested DTOs
// ============================================================================

@ApiSchema({ name: "ImagemFindOneFromImagemArquivoOutputDto" })
export class ImagemFindOneFromImagemArquivoOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "ImagemArquivoFindOneOutputDto" })
@RegisterModel({
  name: "ImagemArquivoFindOneOutputDto",
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
export class ImagemArquivoFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Largura da imagem" })
  @IsInt()
  @Min(0)
  largura: number;

  @ApiProperty({ description: "Altura da imagem" })
  @IsInt()
  @Min(0)
  altura: number;

  @ApiProperty({ description: "Formato da imagem", minLength: 1 })
  @IsString()
  @MinLength(1)
  formato: string;

  @ApiProperty({ description: "Mime-type da imagem", minLength: 1 })
  @IsString()
  @MinLength(1)
  mimeType: string;

  @ApiProperty({ description: "Imagem", type: () => ImagemFindOneFromImagemArquivoOutputRestDto })
  @ValidateNested()
  @Type(() => ImagemFindOneFromImagemArquivoOutputRestDto)
  imagem: ImagemFindOneFromImagemArquivoOutputRestDto;

  @ApiProperty({ description: "Arquivo", type: () => ArquivoFindOneOutputRestDto })
  @ValidateNested()
  @Type(() => ArquivoFindOneOutputRestDto)
  arquivo: ArquivoFindOneOutputRestDto;

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
// FindOneFromImagem Output (for nested use in Imagem)
// ============================================================================

@ApiSchema({ name: "ImagemArquivoFindOneFromImagemOutputDto" })
export class ImagemArquivoFindOneFromImagemOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Largura da imagem" })
  @IsInt()
  @Min(0)
  largura: number;

  @ApiProperty({ description: "Altura da imagem" })
  @IsInt()
  @Min(0)
  altura: number;

  @ApiProperty({ description: "Formato da imagem", minLength: 1 })
  @IsString()
  @MinLength(1)
  formato: string;

  @ApiProperty({ description: "Mime-type da imagem", minLength: 1 })
  @IsString()
  @MinLength(1)
  mimeType: string;

  @ApiProperty({ description: "Arquivo", type: () => ArquivoFindOneOutputRestDto })
  @ValidateNested()
  @Type(() => ArquivoFindOneOutputRestDto)
  arquivo: ArquivoFindOneOutputRestDto;

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

@ApiSchema({ name: "ImagemArquivoListInputDto" })
export class ImagemArquivoListInputRestDto extends PaginationInputRestDto {
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

@ApiSchema({ name: "ImagemArquivoListOutputDto" })
export class ImagemArquivoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [ImagemArquivoFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: ImagemArquivoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "ImagemArquivoCreateInputDto" })
export class ImagemArquivoCreateInputRestDto {
  @ApiProperty({ description: "Largura da imagem" })
  @IsInt()
  @Min(0)
  largura: number;

  @ApiProperty({ description: "Altura da imagem" })
  @IsInt()
  @Min(0)
  altura: number;

  @ApiProperty({ description: "Formato da imagem", minLength: 1 })
  @IsString()
  @MinLength(1)
  formato: string;

  @ApiProperty({ description: "Mime-type da imagem", minLength: 1 })
  @IsString()
  @MinLength(1)
  mimeType: string;

  @ApiProperty({ description: "ID da imagem", format: "uuid" })
  @IsUUID()
  imagemId: string;

  @ApiProperty({ description: "ID do arquivo", format: "uuid" })
  @IsUUID()
  arquivoId: string;
}

@ApiSchema({ name: "ImagemArquivoUpdateInputDto" })
export class ImagemArquivoUpdateInputRestDto extends PartialType(ImagemArquivoCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "ImagemArquivoFindOneInputDto" })
export class ImagemArquivoFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}
