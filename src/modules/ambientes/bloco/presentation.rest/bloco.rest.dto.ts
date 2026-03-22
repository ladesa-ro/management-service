import { CampusFindOneOutputRestDto } from "@/modules/ambientes/campus/presentation.rest";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/shared/presentation/rest";
import { EntityBaseRestDto, PaginationMetaRestDto } from "@/shared/presentation/rest/dtos";
import {
  blocoFindOneInputSchema,
  blocoInputCreateSchema,
  blocoInputUpdateSchema,
  blocoPaginationInputSchema,
} from "../domain/bloco.schemas";

// ============================================================================
// Imagem Stub DTOs (forward reference until imagem module has DTOs)
// ============================================================================

@ApiSchema({ name: "ArquivoFindOneOutputFromBlocoDto" })
export class ArquivoFindOneOutputFromBlocoRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  id: string;
}

@ApiSchema({ name: "ImagemArquivoFindOneFromImagemOutputFromBlocoDto" })
export class ImagemArquivoFindOneFromImagemOutputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  id: string;

  @ApiProperty({ type: "integer", description: "Largura da imagem" })
  largura: number | null;

  @ApiProperty({ type: "integer", description: "Altura da imagem" })
  altura: number | null;

  @ApiProperty({ type: "string", description: "Formato da imagem" })
  formato: string | null;

  @ApiProperty({ type: "string", description: "Mime-type da imagem" })
  mimeType: string | null;

  @ApiProperty({ description: "Arquivo", type: () => ArquivoFindOneOutputFromBlocoRestDto })
  arquivo: ArquivoFindOneOutputFromBlocoRestDto;
}

@ApiSchema({ name: "ImagemFindOneOutputFromBlocoDto" })
export class ImagemFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiPropertyOptional({ type: "string", description: "Descricao da imagem", nullable: true })
  descricao: string | null;

  @ApiProperty({
    description: "Versoes da imagem",
    type: () => [ImagemArquivoFindOneFromImagemOutputRestDto],
  })
  versoes: ImagemArquivoFindOneFromImagemOutputRestDto[];
}

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "BlocoFindOneOutputDto" })
@RegisterModel({
  name: "BlocoFindOneQueryResult",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("codigo"),
    referenceProperty("campus", "CampusFindOneQueryResult"),
    referenceProperty("imagemCapa", "ImagemFindOneQueryResult", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class BlocoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({ type: "string", description: "Nome do bloco", minLength: 1 })
  nome: string;

  @ApiProperty({ type: "string", description: "Codigo do bloco", minLength: 1 })
  codigo: string;

  @ApiProperty({ type: () => CampusFindOneOutputRestDto, description: "Campus do bloco" })
  campus: CampusFindOneOutputRestDto;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    description: "Imagem de capa do bloco",
    nullable: true,
  })
  imagemCapa: ImagemFindOneOutputRestDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "BlocoListInputDto" })
export class BlocoListInputRestDto {
  static schema = blocoPaginationInputSchema;

  [key: string]: string | number | string[] | null | undefined;

  @ApiPropertyOptional({
    type: "integer",
    description: "Pagina de consulta",
    minimum: 1,
    default: 1,
  })
  page?: number = 1;

  @ApiPropertyOptional({
    type: "integer",
    description: "Limite da quantidade de resultados por pagina",
    minimum: 1,
  })
  limit?: number;

  @ApiPropertyOptional({ type: "string", description: "Busca textual" })
  search?: string;

  @ApiPropertyOptional({ description: "Ordenacao (ex: nome:ASC)", isArray: true, type: "string" })
  sortBy?: string[];

  @ApiPropertyOptional({ description: "Seleção de campos", isArray: true, type: "string" })
  selection?: string[];

  @ApiPropertyOptional({ description: "Filtro por ID", type: "string", isArray: true })
  "filter.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID de Campus",
    type: "string",
    isArray: true,
  })
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

@ApiSchema({ name: "BlocoCampusRefInputDto" })
export class BlocoCampusRefInputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do campus (uuid)",
    format: "uuid",
  })
  id: string;
}

@ApiSchema({ name: "BlocoCreateInputDto" })
export class BlocoCreateInputRestDto {
  static schema = blocoInputCreateSchema;

  @ApiProperty({ type: "string", description: "Nome do bloco", minLength: 1 })
  nome: string;

  @ApiProperty({ type: "string", description: "Codigo do bloco", minLength: 1 })
  codigo: string;

  @ApiProperty({ type: () => BlocoCampusRefInputRestDto, description: "Campus do bloco" })
  campus: BlocoCampusRefInputRestDto;
}

@ApiSchema({ name: "BlocoUpdateInputDto" })
export class BlocoUpdateInputRestDto {
  static schema = blocoInputUpdateSchema;

  @ApiPropertyOptional({ type: "string", description: "Nome do bloco", minLength: 1 })
  nome?: string;

  @ApiPropertyOptional({ type: "string", description: "Codigo do bloco", minLength: 1 })
  codigo?: string;

  @ApiPropertyOptional({ type: () => BlocoCampusRefInputRestDto, description: "Campus do bloco" })
  campus?: BlocoCampusRefInputRestDto;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "BlocoFindOneInputDto" })
export class BlocoFindOneInputRestDto {
  static schema = blocoFindOneInputSchema;

  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  id: string;
}
