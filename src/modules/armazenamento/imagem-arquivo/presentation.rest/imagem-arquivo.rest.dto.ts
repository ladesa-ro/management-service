import { ArquivoFindOneOutputRestDto } from "@/modules/armazenamento/arquivo/presentation.rest/arquivo.rest.dto";
import {
  imagemArquivoCreateSchema,
  imagemArquivoFindOneInputSchema,
  imagemArquivoPaginationInputSchema,
  imagemArquivoUpdateSchema,
} from "@/modules/armazenamento/imagem-arquivo/domain/imagem-arquivo.schemas";
import {
  ApiProperty,
  ApiSchema,
  commonProperties,
  PartialType,
  RegisterModel,
  simpleProperty,
} from "@/shared/presentation/rest";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/shared/presentation/rest/dtos";

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
  largura: number;

  @ApiProperty({ type: "integer", description: "Altura da imagem" })
  altura: number;

  @ApiProperty({ type: "string", description: "Formato da imagem", minLength: 1 })
  formato: string;

  @ApiProperty({ type: "string", description: "Mime-type da imagem", minLength: 1 })
  mimeType: string;

  @ApiProperty({ description: "Imagem", type: () => ImagemFindOneFromImagemArquivoOutputRestDto })
  imagem: ImagemFindOneFromImagemArquivoOutputRestDto;

  @ApiProperty({ description: "Arquivo", type: () => ArquivoFindOneOutputRestDto })
  arquivo: ArquivoFindOneOutputRestDto;
}

// ============================================================================
// FindOneFromImagem Output (for nested use in Imagem)
// ============================================================================

@ApiSchema({ name: "ImagemArquivoFindOneFromImagemOutputDto" })
export class ImagemArquivoFindOneFromImagemOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({ type: "integer", description: "Largura da imagem" })
  largura: number;

  @ApiProperty({ type: "integer", description: "Altura da imagem" })
  altura: number;

  @ApiProperty({ type: "string", description: "Formato da imagem", minLength: 1 })
  formato: string;

  @ApiProperty({ type: "string", description: "Mime-type da imagem", minLength: 1 })
  mimeType: string;

  @ApiProperty({ description: "Arquivo", type: () => ArquivoFindOneOutputRestDto })
  arquivo: ArquivoFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "ImagemArquivoListInputDto" })
export class ImagemArquivoListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = imagemArquivoPaginationInputSchema;
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
  static schema = imagemArquivoCreateSchema;

  @ApiProperty({ type: "integer", description: "Largura da imagem" })
  largura: number;

  @ApiProperty({ type: "integer", description: "Altura da imagem" })
  altura: number;

  @ApiProperty({ type: "string", description: "Formato da imagem", minLength: 1 })
  formato: string;

  @ApiProperty({ type: "string", description: "Mime-type da imagem", minLength: 1 })
  mimeType: string;

  @ApiProperty({ type: "string", description: "ID da imagem", format: "uuid" })
  imagemId: string;

  @ApiProperty({ type: "string", description: "ID do arquivo", format: "uuid" })
  arquivoId: string;
}

@ApiSchema({ name: "ImagemArquivoUpdateInputDto" })
export class ImagemArquivoUpdateInputRestDto extends PartialType(ImagemArquivoCreateInputRestDto) {
  static schema = imagemArquivoUpdateSchema;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "ImagemArquivoFindOneInputDto" })
export class ImagemArquivoFindOneInputRestDto {
  static schema = imagemArquivoFindOneInputSchema;

  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  id: string;
}
