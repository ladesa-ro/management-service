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
  CampusFindOneInputRestDto,
  CampusFindOneOutputRestDto,
} from "@/server/nest/modules/campus/rest";

// ============================================================================
// Imagem Stub DTOs (forward reference until imagem module has DTOs)
// ============================================================================

@ApiSchema({ name: "ArquivoFindOneOutputFromBlocoDto" })
export class ArquivoFindOneOutputFromBlocoRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}

@ApiSchema({ name: "ImagemArquivoFindOneFromImagemOutputFromBlocoDto" })
export class ImagemArquivoFindOneFromImagemOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Largura da imagem" })
  largura: number | null;

  @ApiProperty({ description: "Altura da imagem" })
  altura: number | null;

  @ApiProperty({ description: "Formato da imagem" })
  @IsString()
  formato: string | null;

  @ApiProperty({ description: "Mime-type da imagem" })
  @IsString()
  mimeType: string | null;

  @ApiProperty({ description: "Arquivo", type: () => ArquivoFindOneOutputFromBlocoRestDto })
  @ValidateNested()
  @Type(() => ArquivoFindOneOutputFromBlocoRestDto)
  arquivo: ArquivoFindOneOutputFromBlocoRestDto;
}

@ApiSchema({ name: "ImagemFindOneOutputFromBlocoDto" })
export class ImagemFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiPropertyOptional({ description: "Descricao da imagem", nullable: true })
  @IsOptional()
  @IsString()
  descricao: string | null;

  @ApiProperty({
    description: "Versoes da imagem",
    type: () => [ImagemArquivoFindOneFromImagemOutputRestDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImagemArquivoFindOneFromImagemOutputRestDto)
  versoes: ImagemArquivoFindOneFromImagemOutputRestDto[];

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
// FindOne Output
// ============================================================================

@ApiSchema({ name: "BlocoFindOneOutputDto" })
@RegisterModel({
  name: "BlocoFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("codigo"),
    referenceProperty("campus", "CampusFindOneOutputDto"),
    referenceProperty("imagemCapa", "ImagemFindOneOutputDto", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class BlocoFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Nome do bloco", minLength: 1 })
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiProperty({ description: "Codigo do bloco", minLength: 1 })
  @IsString()
  @MinLength(1)
  codigo: string;

  @ApiProperty({ type: () => CampusFindOneOutputRestDto, description: "Campus do bloco" })
  @ValidateNested()
  @Type(() => CampusFindOneOutputRestDto)
  campus: CampusFindOneOutputRestDto;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    description: "Imagem de capa do bloco",
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemFindOneOutputRestDto)
  imagemCapa: ImagemFindOneOutputRestDto | null;

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

@ApiSchema({ name: "BlocoListInputDto" })
export class BlocoListInputRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID de Campus",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.campus.id"?: string[];
}

@ApiSchema({ name: "BlocoListOutputDto" })
export class BlocoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [BlocoFindOneOutputRestDto], description: "Resultados da busca" })
  data: BlocoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "BlocoCreateInputDto" })
export class BlocoCreateInputRestDto {
  @ApiProperty({ description: "Nome do bloco", minLength: 1 })
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiProperty({ description: "Codigo do bloco", minLength: 1 })
  @IsString()
  @MinLength(1)
  codigo: string;

  @ApiProperty({ type: () => CampusFindOneInputRestDto, description: "Campus do bloco" })
  @ValidateNested()
  @Type(() => CampusFindOneInputRestDto)
  campus: CampusFindOneInputRestDto;
}

@ApiSchema({ name: "BlocoUpdateInputDto" })
export class BlocoUpdateInputRestDto extends PartialType(BlocoCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "BlocoFindOneInputDto" })
export class BlocoFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}
