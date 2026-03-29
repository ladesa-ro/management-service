import {
  AmbienteFindOneInputRestDto,
  AmbienteFindOneOutputRestDto,
} from "@/modules/ambientes/ambiente/presentation.rest";
import { ImagemFindOneOutputRestDto } from "@/modules/ambientes/bloco/presentation.rest";
import { DiarioCreateCommandFields } from "@/modules/ensino/diario/domain/commands/diario-create.command";
import {
  DiarioCreateSchema,
  DiarioUpdateSchema,
} from "@/modules/ensino/diario/domain/diario.schemas";
import { DiarioFindOneQueryResultFields } from "@/modules/ensino/diario/domain/queries/diario-find-one.query.result";
import { DiarioFindOneInputSchema } from "@/modules/ensino/diario/domain/queries/diario-find-one.query.schemas";
import { DiarioListQueryFields } from "@/modules/ensino/diario/domain/queries/diario-list.query";
import { DiarioPaginationInputSchema } from "@/modules/ensino/diario/domain/queries/diario-list.query.schemas";
import {
  DisciplinaFindOneInputRestDto,
  DisciplinaFindOneOutputRestDto,
} from "@/modules/ensino/disciplina/presentation.rest";
import {
  TurmaFindOneInputRestDto,
  TurmaFindOneOutputRestDto,
} from "@/modules/ensino/turma/presentation.rest";
import { CalendarioLetivoFindOneOutputRestDto } from "@/modules/horarios/calendario-letivo/presentation.rest";
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

@ApiSchema({ name: "CalendarioLetivoFindOneInputDto" })
export class CalendarioLetivoFindOneInputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  id: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "DiarioFindOneOutputDto" })
export class DiarioFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty(DiarioFindOneQueryResultFields.ativo.swaggerMetadata)
  ativo: boolean;

  @ApiProperty({
    type: () => CalendarioLetivoFindOneOutputRestDto,
    ...DiarioFindOneQueryResultFields.calendarioLetivo.swaggerMetadata,
    nullable: true,
  })
  calendarioLetivo: CalendarioLetivoFindOneOutputRestDto | null;

  @ApiProperty({
    type: () => TurmaFindOneOutputRestDto,
    ...DiarioFindOneQueryResultFields.turma.swaggerMetadata,
    nullable: true,
  })
  turma: TurmaFindOneOutputRestDto | null;

  @ApiProperty({
    type: () => DisciplinaFindOneOutputRestDto,
    ...DiarioFindOneQueryResultFields.disciplina.swaggerMetadata,
    nullable: true,
  })
  disciplina: DisciplinaFindOneOutputRestDto | null;

  @ApiPropertyOptional({
    type: () => AmbienteFindOneOutputRestDto,
    ...DiarioFindOneQueryResultFields.ambientePadrao.swaggerMetadata,
    nullable: true,
  })
  ambientePadrao: AmbienteFindOneOutputRestDto | null;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    ...DiarioFindOneQueryResultFields.imagemCapa.swaggerMetadata,
    nullable: true,
  })
  imagemCapa: ImagemFindOneOutputRestDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "DiarioListInputDto" })
export class DiarioListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = DiarioPaginationInputSchema;

  @ApiPropertyOptional(DiarioListQueryFields.filterTurmaId.swaggerMetadata)
  @TransformToArray()
  "filter.turma.id"?: string[];

  @ApiPropertyOptional(DiarioListQueryFields.filterDisciplinaId.swaggerMetadata)
  @TransformToArray()
  "filter.disciplina.id"?: string[];

  @ApiPropertyOptional(DiarioListQueryFields.filterAmbientePadraoId.swaggerMetadata)
  @TransformToArray()
  "filter.ambientePadrao.id"?: string[];

  @ApiPropertyOptional(DiarioListQueryFields.filterCalendarioLetivoId.swaggerMetadata)
  @TransformToArray()
  "filter.calendarioLetivo.id"?: string[];
}

@ApiSchema({ name: "DiarioListOutputDto" })
export class DiarioListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, ...DiarioListQueryFields.meta.swaggerMetadata })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [DiarioFindOneOutputRestDto],
    ...DiarioListQueryFields.data.swaggerMetadata,
  })
  data: DiarioFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "DiarioCreateInputDto" })
export class DiarioCreateInputRestDto {
  static schema = DiarioCreateSchema.presentation;

  @ApiProperty(DiarioCreateCommandFields.ativo.swaggerMetadata)
  ativo: boolean;

  @ApiProperty({
    type: () => CalendarioLetivoFindOneInputRestDto,
    ...DiarioCreateCommandFields.calendarioLetivo.swaggerMetadata,
  })
  calendarioLetivo: CalendarioLetivoFindOneInputRestDto;

  @ApiProperty({
    type: () => TurmaFindOneInputRestDto,
    ...DiarioCreateCommandFields.turma.swaggerMetadata,
  })
  turma: TurmaFindOneInputRestDto;

  @ApiProperty({
    type: () => DisciplinaFindOneInputRestDto,
    ...DiarioCreateCommandFields.disciplina.swaggerMetadata,
  })
  disciplina: DisciplinaFindOneInputRestDto;

  @ApiPropertyOptional({
    type: () => AmbienteFindOneInputRestDto,
    ...DiarioCreateCommandFields.ambientePadrao.swaggerMetadata,
    nullable: true,
  })
  ambientePadrao?: AmbienteFindOneInputRestDto | null;
}

@ApiSchema({ name: "DiarioUpdateInputDto" })
export class DiarioUpdateInputRestDto extends PartialType(DiarioCreateInputRestDto) {
  static schema = DiarioUpdateSchema.presentation;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "DiarioFindOneInputDto" })
export class DiarioFindOneInputRestDto {
  static schema = DiarioFindOneInputSchema;

  @ApiProperty(DiarioFindOneQueryResultFields.id.swaggerMetadata)
  id: string;
}
