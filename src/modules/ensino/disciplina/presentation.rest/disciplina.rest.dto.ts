import { ImagemFindOneOutputRestDto } from "@/modules/ambientes/bloco/presentation.rest";
import { DisciplinaFindOneInputSchema } from "@/modules/ensino/disciplina/domain/queries/disciplina-find-one.query.schemas";
import { DisciplinaPaginationInputSchema } from "@/modules/ensino/disciplina/domain/queries/disciplina-list.query.schemas";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  TransformToArray,
} from "@/shared/presentation/rest";
import { EntityBaseRestDto, PaginationMetaRestDto } from "@/shared/presentation/rest/dtos";
import { DisciplinaCreateCommandFields } from "../domain/commands/disciplina-create.command";
import { DisciplinaUpdateCommandFields } from "../domain/commands/disciplina-update.command";
import { DisciplinaCreateSchema } from "../domain/disciplina.schemas";
import { DisciplinaFindOneQueryResultFields } from "../domain/queries/disciplina-find-one.query.result";
import { DisciplinaListQueryFields } from "../domain/queries/disciplina-list.query";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "DisciplinaFindOneOutputDto" })
export class DisciplinaFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty(DisciplinaFindOneQueryResultFields.nome.swaggerMetadata)
  nome: string;

  @ApiProperty(DisciplinaFindOneQueryResultFields.nomeAbreviado.swaggerMetadata)
  nomeAbreviado: string;

  @ApiProperty(DisciplinaFindOneQueryResultFields.cargaHoraria.swaggerMetadata)
  cargaHoraria: number;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    ...DisciplinaFindOneQueryResultFields.imagemCapa.swaggerMetadata,
    nullable: true,
  })
  imagemCapa: ImagemFindOneOutputRestDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "DisciplinaListInputDto" })
export class DisciplinaListInputRestDto {
  static schema = DisciplinaPaginationInputSchema;

  [key: string]: string | number | string[] | null | undefined;

  @ApiPropertyOptional(DisciplinaListQueryFields.page.swaggerMetadata)
  page?: number;

  @ApiPropertyOptional(DisciplinaListQueryFields.limit.swaggerMetadata)
  limit?: number;

  @ApiPropertyOptional(DisciplinaListQueryFields.search.swaggerMetadata)
  search?: string;

  @ApiPropertyOptional(DisciplinaListQueryFields.sortBy.swaggerMetadata)
  sortBy?: string[];

  @ApiPropertyOptional(DisciplinaListQueryFields.selection.swaggerMetadata)
  selection?: string[];

  @ApiPropertyOptional(DisciplinaListQueryFields.filterId.swaggerMetadata)
  "filter.id"?: string[];

  @ApiPropertyOptional(DisciplinaListQueryFields.filterDiariosId.swaggerMetadata)
  @TransformToArray()
  "filter.diarios.id"?: string[];
}

@ApiSchema({ name: "DisciplinaListOutputDto" })
export class DisciplinaListOutputRestDto {
  @ApiProperty({
    type: () => PaginationMetaRestDto,
    ...DisciplinaListQueryFields.meta.swaggerMetadata,
  })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [DisciplinaFindOneOutputRestDto],
    ...DisciplinaListQueryFields.data.swaggerMetadata,
  })
  data: DisciplinaFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "DisciplinaCreateInputDto" })
export class DisciplinaCreateInputRestDto {
  static readonly schema = DisciplinaCreateSchema;

  @ApiProperty(DisciplinaCreateCommandFields.nome.swaggerMetadata)
  nome: string;

  @ApiProperty(DisciplinaCreateCommandFields.nomeAbreviado.swaggerMetadata)
  nomeAbreviado: string;

  @ApiProperty(DisciplinaCreateCommandFields.cargaHoraria.swaggerMetadata)
  cargaHoraria: number;
}

@ApiSchema({ name: "DisciplinaUpdateInputDto" })
export class DisciplinaUpdateInputRestDto {
  static readonly schema = DisciplinaCreateSchema;

  @ApiPropertyOptional(DisciplinaUpdateCommandFields.nome.swaggerMetadata)
  nome?: string;

  @ApiPropertyOptional(DisciplinaUpdateCommandFields.nomeAbreviado.swaggerMetadata)
  nomeAbreviado?: string;

  @ApiPropertyOptional(DisciplinaUpdateCommandFields.cargaHoraria.swaggerMetadata)
  cargaHoraria?: number;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "DisciplinaFindOneInputDto" })
export class DisciplinaFindOneInputRestDto {
  static readonly schema = DisciplinaFindOneInputSchema;

  @ApiProperty(DisciplinaFindOneQueryResultFields.id.swaggerMetadata)
  id: string;
}
