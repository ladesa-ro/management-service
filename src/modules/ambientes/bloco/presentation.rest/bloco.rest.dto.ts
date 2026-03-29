import { SharedFields } from "@/domain/abstractions";
import {
  BlocoCreateSchema,
  BlocoUpdateSchema,
} from "@/modules/ambientes/bloco/domain/bloco.schemas";
import { BlocoFindOneInputSchema } from "@/modules/ambientes/bloco/domain/queries/bloco-find-one.query.schemas";
import { BlocoPaginationInputSchema } from "@/modules/ambientes/bloco/domain/queries/bloco-list.query.schemas";
import { CampusFindOneOutputRestDto } from "@/modules/ambientes/campus/presentation.rest";
import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";
import { EntityBaseRestDto, PaginationMetaRestDto } from "@/shared/presentation/rest/dtos";
import { BlocoCreateCommandFields } from "../domain/commands/bloco-create.command";
import { BlocoUpdateCommandFields } from "../domain/commands/bloco-update.command";
import { BlocoFindOneQueryResultFields } from "../domain/queries/bloco-find-one.query.result";
import { BlocoListQueryFields } from "../domain/queries/bloco-list.query";

// ============================================================================
// Imagem Stub DTOs (forward reference until imagem module has DTOs)
// ============================================================================

@ApiSchema({ name: "ArquivoFindOneOutputFromBlocoDto" })
export class ArquivoFindOneOutputFromBlocoRestDto {
  @ApiProperty(SharedFields.idUuid.swaggerMetadata)
  id: string;
}

@ApiSchema({ name: "ImagemArquivoFindOneFromImagemOutputFromBlocoDto" })
export class ImagemArquivoFindOneFromImagemOutputRestDto {
  @ApiProperty(SharedFields.idUuid.swaggerMetadata)
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
export class BlocoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty(BlocoFindOneQueryResultFields.nome.swaggerMetadata)
  nome: string;

  @ApiProperty(BlocoFindOneQueryResultFields.codigo.swaggerMetadata)
  codigo: string;

  @ApiProperty({
    type: () => CampusFindOneOutputRestDto,
    ...BlocoFindOneQueryResultFields.campus.swaggerMetadata,
    nullable: true,
  })
  campus: CampusFindOneOutputRestDto | null;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    ...BlocoFindOneQueryResultFields.imagemCapa.swaggerMetadata,
    nullable: true,
  })
  imagemCapa: ImagemFindOneOutputRestDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "BlocoListInputDto" })
export class BlocoListInputRestDto {
  static schema = BlocoPaginationInputSchema;

  @ApiPropertyOptional(BlocoListQueryFields.page.swaggerMetadata)
  page?: number;

  @ApiPropertyOptional(BlocoListQueryFields.limit.swaggerMetadata)
  limit?: number;

  @ApiPropertyOptional(BlocoListQueryFields.search.swaggerMetadata)
  search?: string;

  @ApiPropertyOptional(BlocoListQueryFields.sortBy.swaggerMetadata)
  sortBy?: string[];

  @ApiPropertyOptional(BlocoListQueryFields.filterId.swaggerMetadata)
  "filter.id"?: string[];

  @ApiPropertyOptional(BlocoListQueryFields.filterCampusId.swaggerMetadata)
  "filter.campus.id"?: string[];
}

@ApiSchema({ name: "BlocoListOutputDto" })
export class BlocoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, ...BlocoListQueryFields.meta.swaggerMetadata })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [BlocoFindOneOutputRestDto],
    ...BlocoListQueryFields.data.swaggerMetadata,
  })
  data: BlocoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "BlocoCampusRefInputDto" })
export class BlocoCampusRefInputRestDto {
  @ApiProperty(SharedFields.idUuid.swaggerMetadata)
  id: string;
}

@ApiSchema({ name: "BlocoCreateInputDto" })
export class BlocoCreateInputRestDto {
  static schema = BlocoCreateSchema.presentation;

  @ApiProperty(BlocoCreateCommandFields.nome.swaggerMetadata)
  nome: string;

  @ApiProperty(BlocoCreateCommandFields.codigo.swaggerMetadata)
  codigo: string;

  @ApiProperty({
    type: () => BlocoCampusRefInputRestDto,
    ...BlocoCreateCommandFields.campus.swaggerMetadata,
  })
  campus: BlocoCampusRefInputRestDto;
}

@ApiSchema({ name: "BlocoUpdateInputDto" })
export class BlocoUpdateInputRestDto {
  static schema = BlocoUpdateSchema.presentation;

  @ApiPropertyOptional(BlocoUpdateCommandFields.nome.swaggerMetadata)
  nome?: string;

  @ApiPropertyOptional(BlocoUpdateCommandFields.codigo.swaggerMetadata)
  codigo?: string;

  @ApiPropertyOptional({
    type: () => BlocoCampusRefInputRestDto,
    ...BlocoUpdateCommandFields.campus.swaggerMetadata,
  })
  campus?: BlocoCampusRefInputRestDto;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "BlocoFindOneInputDto" })
export class BlocoFindOneInputRestDto {
  static schema = BlocoFindOneInputSchema;

  @ApiProperty(SharedFields.idUuid.swaggerMetadata)
  id: string;
}
