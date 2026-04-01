import { AmbienteFindOneOutputRestDto } from "@/modules/ambientes/ambiente/presentation.rest";
import { ImagemFindOneOutputRestDto } from "@/modules/ambientes/bloco/presentation.rest";
import { CursoFindOneOutputRestDto } from "@/modules/ensino/curso/presentation.rest";
import { TurmaFindOneInputSchema } from "@/modules/ensino/turma/domain/queries/turma-find-one.query.schemas";
import { TurmaPaginationInputSchema } from "@/modules/ensino/turma/domain/queries/turma-list.query.schemas";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  PartialType,
  TransformToArray,
} from "@/shared/presentation/rest";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/shared/presentation/rest/dtos";
import { TurmaCreateCommandFields } from "../domain/commands/turma-create.command";
import { TurmaFindOneQueryResultFields } from "../domain/queries/turma-find-one.query.result";
import { TurmaListQueryFields } from "../domain/queries/turma-list.query";
import { TurmaCreateSchema, TurmaUpdateSchema } from "../domain/turma.schemas";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "TurmaFindOneOutputDto" })
export class TurmaFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty(TurmaFindOneQueryResultFields.periodo.swaggerMetadata)
  periodo: string;

  @ApiPropertyOptional(TurmaFindOneQueryResultFields.nome.swaggerMetadata)
  nome: string | null;

  @ApiProperty({
    type: () => CursoFindOneOutputRestDto,
    ...TurmaFindOneQueryResultFields.curso.swaggerMetadata,
  })
  curso: CursoFindOneOutputRestDto;

  @ApiPropertyOptional({
    type: () => AmbienteFindOneOutputRestDto,
    ...TurmaFindOneQueryResultFields.ambientePadraoAula.swaggerMetadata,
  })
  ambientePadraoAula: AmbienteFindOneOutputRestDto | null;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    ...TurmaFindOneQueryResultFields.imagemCapa.swaggerMetadata,
  })
  imagemCapa: ImagemFindOneOutputRestDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "TurmaListInputDto" })
export class TurmaListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = TurmaPaginationInputSchema;

  @ApiPropertyOptional(TurmaListQueryFields.filterPeriodo.swaggerMetadata)
  @TransformToArray()
  "filter.periodo"?: string[];

  @ApiPropertyOptional(TurmaListQueryFields.filterAmbientePadraoAulaNome.swaggerMetadata)
  @TransformToArray()
  "filter.ambientePadraoAula.nome"?: string[];

  @ApiPropertyOptional(TurmaListQueryFields.filterAmbientePadraoAulaCodigo.swaggerMetadata)
  @TransformToArray()
  "filter.ambientePadraoAula.codigo"?: string[];

  @ApiPropertyOptional(TurmaListQueryFields.filterAmbientePadraoAulaCapacidade.swaggerMetadata)
  @TransformToArray()
  "filter.ambientePadraoAula.capacidade"?: string[];

  @ApiPropertyOptional(TurmaListQueryFields.filterAmbientePadraoAulaTipo.swaggerMetadata)
  @TransformToArray()
  "filter.ambientePadraoAula.tipo"?: string[];

  @ApiPropertyOptional(TurmaListQueryFields.filterCursoId.swaggerMetadata)
  @TransformToArray()
  "filter.curso.id"?: string[];

  @ApiPropertyOptional(TurmaListQueryFields.filterCursoNome.swaggerMetadata)
  @TransformToArray()
  "filter.curso.nome"?: string[];

  @ApiPropertyOptional(TurmaListQueryFields.filterCursoNomeAbreviado.swaggerMetadata)
  @TransformToArray()
  "filter.curso.nomeAbreviado"?: string[];

  @ApiPropertyOptional(TurmaListQueryFields.filterCursoCampusId.swaggerMetadata)
  @TransformToArray()
  "filter.curso.campus.id"?: string[];

  @ApiPropertyOptional(TurmaListQueryFields.filterCursoOfertaFormacaoId.swaggerMetadata)
  @TransformToArray()
  "filter.curso.ofertaFormacao.id"?: string[];

  @ApiPropertyOptional(TurmaListQueryFields.filterCursoOfertaFormacaoNome.swaggerMetadata)
  @TransformToArray()
  "filter.curso.ofertaFormacao.nome"?: string[];

  @ApiPropertyOptional(TurmaListQueryFields.filterCursoOfertaFormacaoSlug.swaggerMetadata)
  @TransformToArray()
  "filter.curso.ofertaFormacao.slug"?: string[];
}

@ApiSchema({ name: "TurmaListOutputDto" })
export class TurmaListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, ...TurmaListQueryFields.meta.swaggerMetadata })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [TurmaFindOneOutputRestDto],
    ...TurmaListQueryFields.data.swaggerMetadata,
  })
  data: TurmaFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "TurmaCreateInputDto" })
export class TurmaCreateInputRestDto {
  static readonly schema = TurmaCreateSchema.presentation;

  @ApiProperty(TurmaCreateCommandFields.periodo.swaggerMetadata)
  periodo: string;

  @ApiPropertyOptional(TurmaCreateCommandFields.nome.swaggerMetadata)
  nome?: string | null;

  @ApiProperty(TurmaCreateCommandFields.curso.swaggerMetadata)
  curso: { id: string };

  @ApiPropertyOptional(TurmaCreateCommandFields.ambientePadraoAula.swaggerMetadata)
  ambientePadraoAula?: { id: string } | null;
}

@ApiSchema({ name: "TurmaUpdateInputDto" })
export class TurmaUpdateInputRestDto extends PartialType(TurmaCreateInputRestDto) {
  static readonly schema = TurmaUpdateSchema.presentation;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "TurmaFindOneInputDto" })
export class TurmaFindOneInputRestDto {
  static readonly schema = TurmaFindOneInputSchema;

  @ApiProperty(TurmaFindOneQueryResultFields.id.swaggerMetadata)
  id: string;
}
