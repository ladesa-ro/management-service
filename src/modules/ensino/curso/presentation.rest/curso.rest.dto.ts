import { ImagemFindOneOutputRestDto } from "@/modules/ambientes/bloco/presentation.rest";
import { CampusFindOneOutputRestDto } from "@/modules/ambientes/campus/presentation.rest";
import { CursoFindOneInputSchema } from "@/modules/ensino/curso/domain/queries/curso-find-one.query.schemas";
import { CursoPaginationInputSchema } from "@/modules/ensino/curso/domain/queries/curso-list.query.schemas";
import { OfertaFormacaoFindOneOutputRestDto } from "@/modules/ensino/oferta-formacao/presentation.rest";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  TransformToArray,
} from "@/shared/presentation/rest";
import { EntityBaseRestDto, PaginationMetaRestDto } from "@/shared/presentation/rest/dtos";
import { CursoCreateCommandFields } from "../domain/commands/curso-create.command";
import { CursoUpdateCommandFields } from "../domain/commands/curso-update.command";
import { CursoCreateSchema } from "../domain/curso.schemas";
import { CursoFindOneQueryResultFields } from "../domain/queries/curso-find-one.query.result";
import { CursoListQueryFields } from "../domain/queries/curso-list.query";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "CursoFindOneOutputDto" })
export class CursoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty(CursoFindOneQueryResultFields.nome.swaggerMetadata)
  nome: string;

  @ApiProperty(CursoFindOneQueryResultFields.nomeAbreviado.swaggerMetadata)
  nomeAbreviado: string;

  @ApiProperty({
    type: () => CampusFindOneOutputRestDto,
    ...CursoFindOneQueryResultFields.campus.swaggerMetadata,
  })
  campus: CampusFindOneOutputRestDto;

  @ApiProperty({
    type: () => OfertaFormacaoFindOneOutputRestDto,
    ...CursoFindOneQueryResultFields.ofertaFormacao.swaggerMetadata,
  })
  ofertaFormacao: OfertaFormacaoFindOneOutputRestDto;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    ...CursoFindOneQueryResultFields.imagemCapa.swaggerMetadata,
    nullable: true,
  })
  imagemCapa: ImagemFindOneOutputRestDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "CursoListInputDto" })
export class CursoListInputRestDto {
  static schema = CursoPaginationInputSchema;

  [key: string]: string | number | string[] | null | undefined;

  @ApiPropertyOptional(CursoListQueryFields.page.swaggerMetadata)
  page?: number;

  @ApiPropertyOptional(CursoListQueryFields.limit.swaggerMetadata)
  limit?: number;

  @ApiPropertyOptional(CursoListQueryFields.search.swaggerMetadata)
  search?: string;

  @ApiPropertyOptional(CursoListQueryFields.sortBy.swaggerMetadata)
  sortBy?: string[];

  @ApiPropertyOptional(CursoListQueryFields.selection.swaggerMetadata)
  selection?: string[];

  @ApiPropertyOptional(CursoListQueryFields.filterId.swaggerMetadata)
  "filter.id"?: string[];

  @ApiPropertyOptional(CursoListQueryFields.filterCampusId.swaggerMetadata)
  @TransformToArray()
  "filter.campus.id"?: string[];

  @ApiPropertyOptional(CursoListQueryFields.filterOfertaFormacaoId.swaggerMetadata)
  @TransformToArray()
  "filter.ofertaFormacao.id"?: string[];
}

@ApiSchema({ name: "CursoListOutputDto" })
export class CursoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, ...CursoListQueryFields.meta.swaggerMetadata })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [CursoFindOneOutputRestDto],
    ...CursoListQueryFields.data.swaggerMetadata,
  })
  data: CursoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "CursoCreateInputDto" })
export class CursoCreateInputRestDto {
  static readonly schema = CursoCreateSchema.presentation;

  @ApiProperty(CursoCreateCommandFields.nome.swaggerMetadata)
  nome: string;

  @ApiProperty(CursoCreateCommandFields.nomeAbreviado.swaggerMetadata)
  nomeAbreviado: string;

  @ApiProperty(CursoCreateCommandFields.campus.swaggerMetadata)
  campus: { id: string };

  @ApiProperty(CursoCreateCommandFields.ofertaFormacao.swaggerMetadata)
  ofertaFormacao: { id: string };
}

@ApiSchema({ name: "CursoUpdateInputDto" })
export class CursoUpdateInputRestDto {
  static readonly schema = CursoCreateSchema.presentation;

  @ApiPropertyOptional(CursoUpdateCommandFields.nome.swaggerMetadata)
  nome?: string;

  @ApiPropertyOptional(CursoUpdateCommandFields.nomeAbreviado.swaggerMetadata)
  nomeAbreviado?: string;

  @ApiPropertyOptional(CursoUpdateCommandFields.campus.swaggerMetadata)
  campus?: { id: string };

  @ApiPropertyOptional(CursoUpdateCommandFields.ofertaFormacao.swaggerMetadata)
  ofertaFormacao?: { id: string };
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "CursoFindOneInputDto" })
export class CursoFindOneInputRestDto {
  static readonly schema = CursoFindOneInputSchema;

  @ApiProperty(CursoFindOneQueryResultFields.id.swaggerMetadata)
  id: string;
}
