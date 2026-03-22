import { NivelFormacaoFindOneInputSchema } from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-find-one.query.schemas";
import { NivelFormacaoPaginationInputSchema } from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-list.query.schemas";
import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";
import { EntityBaseRestDto, PaginationMetaRestDto } from "@/shared/presentation/rest/dtos";
import { NivelFormacaoCreateCommandFields } from "../domain/commands/nivel-formacao-create.command";
import { NivelFormacaoUpdateCommandFields } from "../domain/commands/nivel-formacao-update.command";
import { NivelFormacaoCreateSchema } from "../domain/nivel-formacao.schemas";
import { NivelFormacaoFindOneQueryResultFields } from "../domain/queries/nivel-formacao-find-one.query.result";
import { NivelFormacaoListQueryFields } from "../domain/queries/nivel-formacao-list.query";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "NivelFormacaoFindOneOutputDto" })
export class NivelFormacaoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty(NivelFormacaoFindOneQueryResultFields.slug.swaggerMetadata)
  slug: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "NivelFormacaoListInputDto" })
export class NivelFormacaoListInputRestDto {
  static schema = NivelFormacaoPaginationInputSchema;

  [key: string]: string | number | string[] | null | undefined;

  @ApiPropertyOptional(NivelFormacaoListQueryFields.page.swaggerMetadata)
  page?: number;

  @ApiPropertyOptional(NivelFormacaoListQueryFields.limit.swaggerMetadata)
  limit?: number;

  @ApiPropertyOptional(NivelFormacaoListQueryFields.search.swaggerMetadata)
  search?: string;

  @ApiPropertyOptional(NivelFormacaoListQueryFields.sortBy.swaggerMetadata)
  sortBy?: string[];

  @ApiPropertyOptional(NivelFormacaoListQueryFields.selection.swaggerMetadata)
  selection?: string[];

  @ApiPropertyOptional(NivelFormacaoListQueryFields.filterId.swaggerMetadata)
  "filter.id"?: string[];
}

@ApiSchema({ name: "NivelFormacaoListOutputDto" })
export class NivelFormacaoListOutputRestDto {
  @ApiProperty({
    type: () => PaginationMetaRestDto,
    ...NivelFormacaoListQueryFields.meta.swaggerMetadata,
  })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [NivelFormacaoFindOneOutputRestDto],
    ...NivelFormacaoListQueryFields.data.swaggerMetadata,
  })
  data: NivelFormacaoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "NivelFormacaoCreateInputDto" })
export class NivelFormacaoCreateInputRestDto {
  static readonly schema = NivelFormacaoCreateSchema;

  @ApiProperty(NivelFormacaoCreateCommandFields.slug.swaggerMetadata)
  slug: string;
}

@ApiSchema({ name: "NivelFormacaoUpdateInputDto" })
export class NivelFormacaoUpdateInputRestDto {
  static readonly schema = NivelFormacaoCreateSchema;

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
