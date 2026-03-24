import { EstadoFindOneQueryFields } from "@/modules/localidades/estado/domain/queries/estado-find-one.query";
import { EstadoFindOneQueryResultFields } from "@/modules/localidades/estado/domain/queries/estado-find-one.query.result";
import { EstadoFindOneInputSchema } from "@/modules/localidades/estado/domain/queries/estado-find-one.query.schemas";
import { EstadoListQueryFields } from "@/modules/localidades/estado/domain/queries/estado-list.query";
import { EstadoPaginationInputSchema } from "@/modules/localidades/estado/domain/queries/estado-list.query.schemas";
import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";
import { PaginationMetaRestDto } from "@/shared/presentation/rest/dtos";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "EstadoFindOneOutputDto" })
export class EstadoFindOneOutputRestDto {
  @ApiProperty({ type: "integer", ...EstadoFindOneQueryResultFields.id.swaggerMetadata })
  id: number;

  @ApiProperty(EstadoFindOneQueryResultFields.nome.swaggerMetadata)
  nome: string;

  @ApiProperty(EstadoFindOneQueryResultFields.sigla.swaggerMetadata)
  sigla: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "EstadoListInputDto" })
export class EstadoListInputRestDto {
  static schema = EstadoPaginationInputSchema;

  [key: string]: string | number | string[] | null | undefined;

  @ApiPropertyOptional(EstadoListQueryFields.page.swaggerMetadata)
  page?: number;

  @ApiPropertyOptional(EstadoListQueryFields.limit.swaggerMetadata)
  limit?: number;

  @ApiPropertyOptional(EstadoListQueryFields.search.swaggerMetadata)
  search?: string;

  @ApiPropertyOptional(EstadoListQueryFields.sortBy.swaggerMetadata)
  sortBy?: string[];

  @ApiPropertyOptional(EstadoListQueryFields.filterId.swaggerMetadata)
  "filter.id"?: string[];
}

@ApiSchema({ name: "EstadoListOutputDto" })
export class EstadoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, ...EstadoListQueryFields.meta.swaggerMetadata })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [EstadoFindOneOutputRestDto],
    ...EstadoListQueryFields.data.swaggerMetadata,
  })
  data: EstadoFindOneOutputRestDto[];
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "EstadoFindOneInputDto" })
export class EstadoFindOneInputRestDto {
  static schema = EstadoFindOneInputSchema;

  @ApiProperty({ type: "integer", ...EstadoFindOneQueryFields.id.swaggerMetadata })
  id: number;
}
