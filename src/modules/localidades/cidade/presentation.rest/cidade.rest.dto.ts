import { CidadeFindOneQueryFields } from "@/modules/localidades/cidade/domain/queries/cidade-find-one.query";
import { CidadeFindOneQueryResultFields } from "@/modules/localidades/cidade/domain/queries/cidade-find-one.query.result";
import { CidadeFindOneInputSchema } from "@/modules/localidades/cidade/domain/queries/cidade-find-one.query.schemas";
import { CidadeListQueryFields } from "@/modules/localidades/cidade/domain/queries/cidade-list.query";
import { CidadePaginationInputSchema } from "@/modules/localidades/cidade/domain/queries/cidade-list.query.schemas";
import { EstadoFindOneOutputRestDto } from "@/modules/localidades/estado/presentation.rest/estado.rest.dto";
import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";
import { PaginationMetaRestDto } from "@/shared/presentation/rest/dtos";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "CidadeFindOneOutputDto" })
export class CidadeFindOneOutputRestDto {
  @ApiProperty(CidadeFindOneQueryResultFields.id.swaggerMetadata)
  id: number;

  @ApiProperty(CidadeFindOneQueryResultFields.nome.swaggerMetadata)
  nome: string;

  @ApiProperty({
    type: () => EstadoFindOneOutputRestDto,
    ...CidadeFindOneQueryResultFields.estado.swaggerMetadata,
    nullable: true,
  })
  estado: EstadoFindOneOutputRestDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "CidadeListInputDto" })
export class CidadeListInputRestDto {
  static schema = CidadePaginationInputSchema;

  @ApiPropertyOptional(CidadeListQueryFields.page.swaggerMetadata)
  page?: number;

  @ApiPropertyOptional(CidadeListQueryFields.limit.swaggerMetadata)
  limit?: number;

  @ApiPropertyOptional(CidadeListQueryFields.search.swaggerMetadata)
  search?: string;

  @ApiPropertyOptional(CidadeListQueryFields.sortBy.swaggerMetadata)
  sortBy?: string[];

  @ApiPropertyOptional(CidadeListQueryFields.filterId.swaggerMetadata)
  "filter.id"?: string[];

  @ApiPropertyOptional(CidadeListQueryFields.filterEstadoId.swaggerMetadata)
  "filter.estado.id"?: string[];

  @ApiPropertyOptional(CidadeListQueryFields.filterEstadoNome.swaggerMetadata)
  "filter.estado.nome"?: string[];

  @ApiPropertyOptional(CidadeListQueryFields.filterEstadoSigla.swaggerMetadata)
  "filter.estado.sigla"?: string[];
}

@ApiSchema({ name: "CidadeListOutputDto" })
export class CidadeListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, ...CidadeListQueryFields.meta.swaggerMetadata })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [CidadeFindOneOutputRestDto],
    ...CidadeListQueryFields.data.swaggerMetadata,
  })
  data: CidadeFindOneOutputRestDto[];
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "CidadeFindOneInputDto" })
export class CidadeFindOneInputRestDto {
  static schema = CidadeFindOneInputSchema;

  @ApiProperty(CidadeFindOneQueryFields.id.swaggerMetadata)
  id: number;
}
