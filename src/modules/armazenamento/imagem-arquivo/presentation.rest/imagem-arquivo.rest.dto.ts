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
  simpleProperty,
} from "@/modules/@shared/presentation/rest";
import {
  IsInt,
  IsString,
  IsUUID,
  Min,
  MinLength,
  Type,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import { ArquivoFindOneOutputRestDto } from "@/modules/armazenamento/arquivo/presentation.rest/arquivo.rest.dto";

// ============================================================================
// Nested DTOs
// ============================================================================

@ApiSchema({ name: "ImagemFindOneFromImagemArquivoOutputDto" })
export class ImagemFindOneFromImagemArquivoOutputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "ImagemArquivoFindOneOutputDto" })
@RegisterModel({
  name: "ImagemArquivoFindOneQueryResult",
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
export class ImagemArquivoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({ type: "integer", description: "Largura da imagem" })
  @IsInt()
  @Min(0)
  largura: number;

  @ApiProperty({ type: "integer", description: "Altura da imagem" })
  @IsInt()
  @Min(0)
  altura: number;

  @ApiProperty({ type: "string", description: "Formato da imagem", minLength: 1 })
  @IsString()
  @MinLength(1)
  formato: string;

  @ApiProperty({ type: "string", description: "Mime-type da imagem", minLength: 1 })
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
}

// ============================================================================
// FindOneFromImagem Output (for nested use in Imagem)
// ============================================================================

@ApiSchema({ name: "ImagemArquivoFindOneFromImagemOutputDto" })
export class ImagemArquivoFindOneFromImagemOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({ type: "integer", description: "Largura da imagem" })
  @IsInt()
  @Min(0)
  largura: number;

  @ApiProperty({ type: "integer", description: "Altura da imagem" })
  @IsInt()
  @Min(0)
  altura: number;

  @ApiProperty({ type: "string", description: "Formato da imagem", minLength: 1 })
  @IsString()
  @MinLength(1)
  formato: string;

  @ApiProperty({ type: "string", description: "Mime-type da imagem", minLength: 1 })
  @IsString()
  @MinLength(1)
  mimeType: string;

  @ApiProperty({ description: "Arquivo", type: () => ArquivoFindOneOutputRestDto })
  @ValidateNested()
  @Type(() => ArquivoFindOneOutputRestDto)
  arquivo: ArquivoFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "ImagemArquivoListInputDto" })
export class ImagemArquivoListInputRestDto extends PaginatedFilterByIdRestDto {}

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
  @ApiProperty({ type: "integer", description: "Largura da imagem" })
  @IsInt()
  @Min(0)
  largura: number;

  @ApiProperty({ type: "integer", description: "Altura da imagem" })
  @IsInt()
  @Min(0)
  altura: number;

  @ApiProperty({ type: "string", description: "Formato da imagem", minLength: 1 })
  @IsString()
  @MinLength(1)
  formato: string;

  @ApiProperty({ type: "string", description: "Mime-type da imagem", minLength: 1 })
  @IsString()
  @MinLength(1)
  mimeType: string;

  @ApiProperty({ type: "string", description: "ID da imagem", format: "uuid" })
  @IsUUID()
  imagemId: string;

  @ApiProperty({ type: "string", description: "ID do arquivo", format: "uuid" })
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
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}
