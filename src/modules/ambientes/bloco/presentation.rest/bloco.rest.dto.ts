import { SharedFields } from "@/domain/abstractions";
import {
  BlocoCreateSchema,
  BlocoUpdateSchema,
} from "@/modules/ambientes/bloco/domain/bloco.schemas";
import { BlocoFindOneInputSchema } from "@/modules/ambientes/bloco/domain/queries/bloco-find-one.query.schemas";
import { BlocoPaginationInputSchema } from "@/modules/ambientes/bloco/domain/queries/bloco-list.query.schemas";
import { CampusFindOneOutputRestDto } from "@/modules/ambientes/campus/presentation.rest";
import { ImagemFields } from "@/modules/armazenamento/imagem/domain/imagem.fields";
import { ImagemArquivoFromImagemFields } from "@/modules/armazenamento/imagem-arquivo/domain/imagem-arquivo-from-imagem.fields";
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

  @ApiPropertyOptional(ImagemArquivoFromImagemFields.largura.swaggerMetadata)
  largura: number | null;

  @ApiPropertyOptional(ImagemArquivoFromImagemFields.altura.swaggerMetadata)
  altura: number | null;

  @ApiPropertyOptional(ImagemArquivoFromImagemFields.formato.swaggerMetadata)
  formato: string | null;

  @ApiPropertyOptional(ImagemArquivoFromImagemFields.mimeType.swaggerMetadata)
  mimeType: string | null;

  @ApiProperty({
    ...ImagemArquivoFromImagemFields.arquivo.swaggerMetadata,
    type: () => ArquivoFindOneOutputFromBlocoRestDto,
  })
  arquivo: ArquivoFindOneOutputFromBlocoRestDto;
}

@ApiSchema({ name: "ImagemFindOneOutputFromBlocoDto" })
export class ImagemFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiPropertyOptional(ImagemFields.descricao.swaggerMetadata)
  descricao: string | null;

  @ApiProperty({
    ...ImagemFields.versoes.swaggerMetadata,
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
    ...BlocoFindOneQueryResultFields.campus.swaggerMetadata,
    type: () => CampusFindOneOutputRestDto,
  })
  campus: CampusFindOneOutputRestDto;

  @ApiPropertyOptional({
    ...BlocoFindOneQueryResultFields.imagemCapa.swaggerMetadata,
    type: () => ImagemFindOneOutputRestDto,
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
  @ApiProperty({ ...BlocoListQueryFields.meta.swaggerMetadata, type: () => PaginationMetaRestDto })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    ...BlocoListQueryFields.data.swaggerMetadata,
    type: () => [BlocoFindOneOutputRestDto],
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
    ...BlocoCreateCommandFields.campus.swaggerMetadata,
    type: () => BlocoCampusRefInputRestDto,
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
    ...BlocoUpdateCommandFields.campus.swaggerMetadata,
    type: () => BlocoCampusRefInputRestDto,
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
