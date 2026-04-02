import { SharedFields } from "@/domain/abstractions";
import { ImagemFields } from "@/modules/armazenamento/imagem/domain/imagem.fields";
import { ImagemArquivoFromImagemFields } from "@/modules/armazenamento/imagem-arquivo/domain/imagem-arquivo-from-imagem.fields";
import { NivelFormacaoFindOneInputSchema } from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-find-one.query.schemas";
import { NivelFormacaoPaginationInputSchema } from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-list.query.schemas";
import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";
import { EntityBaseRestDto, PaginationMetaRestDto } from "@/shared/presentation/rest/dtos";
import { NivelFormacaoCreateCommandFields } from "../domain/commands/nivel-formacao-create.command";
import { NivelFormacaoUpdateCommandFields } from "../domain/commands/nivel-formacao-update.command";
import {
  NivelFormacaoCreateSchema,
  NivelFormacaoUpdateSchema,
} from "../domain/nivel-formacao.schemas";
import { NivelFormacaoFindOneQueryResultFields } from "../domain/queries/nivel-formacao-find-one.query.result";
import { NivelFormacaoListQueryFields } from "../domain/queries/nivel-formacao-list.query";

// ============================================================================
// Imagem Stub DTOs (forward reference until imagem module has DTOs)
// ============================================================================

@ApiSchema({ name: "ArquivoFindOneOutputFromNivelFormacaoDto" })
export class ArquivoFindOneOutputFromNivelFormacaoRestDto {
  @ApiProperty(SharedFields.idUuid.swaggerMetadata)
  id: string;
}

@ApiSchema({ name: "ImagemArquivoFindOneFromImagemOutputFromNivelFormacaoDto" })
export class ImagemArquivoFindOneFromImagemOutputFromNivelFormacaoRestDto {
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
    type: () => ArquivoFindOneOutputFromNivelFormacaoRestDto,
  })
  arquivo: ArquivoFindOneOutputFromNivelFormacaoRestDto;
}

@ApiSchema({ name: "ImagemFindOneOutputFromNivelFormacaoDto" })
export class ImagemFindOneOutputFromNivelFormacaoRestDto extends EntityBaseRestDto {
  @ApiPropertyOptional(ImagemFields.descricao.swaggerMetadata)
  descricao: string | null;

  @ApiProperty({
    ...ImagemFields.versoes.swaggerMetadata,
    type: () => [ImagemArquivoFindOneFromImagemOutputFromNivelFormacaoRestDto],
  })
  versoes: ImagemArquivoFindOneFromImagemOutputFromNivelFormacaoRestDto[];
}

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "NivelFormacaoFindOneOutputDto" })
export class NivelFormacaoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty(NivelFormacaoFindOneQueryResultFields.nome.swaggerMetadata)
  nome: string;

  @ApiProperty(NivelFormacaoFindOneQueryResultFields.slug.swaggerMetadata)
  slug: string;

  @ApiPropertyOptional({
    ...NivelFormacaoFindOneQueryResultFields.imagemCapa.swaggerMetadata,
    type: () => ImagemFindOneOutputFromNivelFormacaoRestDto,
  })
  imagemCapa: ImagemFindOneOutputFromNivelFormacaoRestDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "NivelFormacaoListInputDto" })
export class NivelFormacaoListInputRestDto {
  static schema = NivelFormacaoPaginationInputSchema;

  @ApiPropertyOptional(NivelFormacaoListQueryFields.page.swaggerMetadata)
  page?: number;

  @ApiPropertyOptional(NivelFormacaoListQueryFields.limit.swaggerMetadata)
  limit?: number;

  @ApiPropertyOptional(NivelFormacaoListQueryFields.search.swaggerMetadata)
  search?: string;

  @ApiPropertyOptional(NivelFormacaoListQueryFields.sortBy.swaggerMetadata)
  sortBy?: string[];

  @ApiPropertyOptional(NivelFormacaoListQueryFields.filterId.swaggerMetadata)
  "filter.id"?: string[];
}

@ApiSchema({ name: "NivelFormacaoListOutputDto" })
export class NivelFormacaoListOutputRestDto {
  @ApiProperty({
    ...NivelFormacaoListQueryFields.meta.swaggerMetadata,
    type: () => PaginationMetaRestDto,
  })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    ...NivelFormacaoListQueryFields.data.swaggerMetadata,
    type: () => [NivelFormacaoFindOneOutputRestDto],
  })
  data: NivelFormacaoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "NivelFormacaoCreateInputDto" })
export class NivelFormacaoCreateInputRestDto {
  static readonly schema = NivelFormacaoCreateSchema.presentation;

  @ApiProperty(NivelFormacaoCreateCommandFields.nome.swaggerMetadata)
  nome: string;

  @ApiProperty(NivelFormacaoCreateCommandFields.slug.swaggerMetadata)
  slug: string;
}

@ApiSchema({ name: "NivelFormacaoUpdateInputDto" })
export class NivelFormacaoUpdateInputRestDto {
  static readonly schema = NivelFormacaoUpdateSchema.presentation;

  @ApiPropertyOptional(NivelFormacaoUpdateCommandFields.nome.swaggerMetadata)
  nome?: string;

  @ApiPropertyOptional(NivelFormacaoUpdateCommandFields.slug.swaggerMetadata)
  slug?: string;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "NivelFormacaoFindOneInputDto" })
export class NivelFormacaoFindOneInputRestDto {
  static readonly schema = NivelFormacaoFindOneInputSchema;

  @ApiProperty(NivelFormacaoFindOneQueryResultFields.id.swaggerMetadata)
  id: string;
}
