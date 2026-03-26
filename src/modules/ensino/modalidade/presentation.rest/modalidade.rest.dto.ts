import { ModalidadeFindOneInputSchema } from "@/modules/ensino/modalidade/domain/queries/modalidade-find-one.query.schemas";
import { ModalidadePaginationInputSchema } from "@/modules/ensino/modalidade/domain/queries/modalidade-list.query.schemas";
import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";
import { EntityBaseRestDto, PaginationMetaRestDto } from "@/shared/presentation/rest/dtos";
import { ModalidadeCreateCommandFields } from "../domain/commands/modalidade-create.command";
import { ModalidadeUpdateCommandFields } from "../domain/commands/modalidade-update.command";
import { ModalidadeCreateSchema } from "../domain/modalidade.schemas";
import { ModalidadeFindOneQueryResultFields } from "../domain/queries/modalidade-find-one.query.result";
import { ModalidadeListQueryFields } from "../domain/queries/modalidade-list.query";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "ModalidadeFindOneOutputDto" })
export class ModalidadeFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty(ModalidadeFindOneQueryResultFields.nome.swaggerMetadata)
  nome: string;

  @ApiProperty(ModalidadeFindOneQueryResultFields.slug.swaggerMetadata)
  slug: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "ModalidadeListInputDto" })
export class ModalidadeListInputRestDto {
  static schema = ModalidadePaginationInputSchema;

  @ApiPropertyOptional(ModalidadeListQueryFields.page.swaggerMetadata)
  page?: number;

  @ApiPropertyOptional(ModalidadeListQueryFields.limit.swaggerMetadata)
  limit?: number;

  @ApiPropertyOptional(ModalidadeListQueryFields.search.swaggerMetadata)
  search?: string;

  @ApiPropertyOptional(ModalidadeListQueryFields.sortBy.swaggerMetadata)
  sortBy?: string[];

  @ApiPropertyOptional(ModalidadeListQueryFields.filterId.swaggerMetadata)
  "filter.id"?: string[];
}

@ApiSchema({ name: "ModalidadeListOutputDto" })
export class ModalidadeListOutputRestDto {
  @ApiProperty({
    type: () => PaginationMetaRestDto,
    ...ModalidadeListQueryFields.meta.swaggerMetadata,
  })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [ModalidadeFindOneOutputRestDto],
    ...ModalidadeListQueryFields.data.swaggerMetadata,
  })
  data: ModalidadeFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "ModalidadeCreateInputDto" })
export class ModalidadeCreateInputRestDto {
  static readonly schema = ModalidadeCreateSchema.presentation;

  @ApiProperty(ModalidadeCreateCommandFields.nome.swaggerMetadata)
  nome: string;

  @ApiProperty(ModalidadeCreateCommandFields.slug.swaggerMetadata)
  slug: string;
}

@ApiSchema({ name: "ModalidadeUpdateInputDto" })
export class ModalidadeUpdateInputRestDto {
  static readonly schema = ModalidadeCreateSchema.presentation;

  @ApiPropertyOptional(ModalidadeUpdateCommandFields.nome.swaggerMetadata)
  nome?: string;

  @ApiPropertyOptional(ModalidadeUpdateCommandFields.slug.swaggerMetadata)
  slug?: string;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "ModalidadeFindOneInputDto" })
export class ModalidadeFindOneInputRestDto {
  static readonly schema = ModalidadeFindOneInputSchema;

  @ApiProperty(ModalidadeFindOneQueryResultFields.id.swaggerMetadata)
  id: string;
}
