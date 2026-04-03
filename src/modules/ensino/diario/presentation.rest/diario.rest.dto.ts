import {
  AmbienteFindOneInputRestDto,
  AmbienteFindOneOutputRestDto,
} from "@/modules/ambientes/ambiente/presentation.rest";
import { ImagemFindOneOutputRestDto } from "@/modules/ambientes/bloco/presentation.rest";
import { CalendarioLetivoFindOneOutputRestDto } from "@/modules/calendario/letivo/presentation.rest";
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
    ...DiarioFindOneQueryResultFields.calendarioLetivo.swaggerMetadata,
    type: () => CalendarioLetivoFindOneOutputRestDto,
  })
  calendarioLetivo: CalendarioLetivoFindOneOutputRestDto;

  @ApiProperty({
    ...DiarioFindOneQueryResultFields.turma.swaggerMetadata,
    type: () => TurmaFindOneOutputRestDto,
  })
  turma: TurmaFindOneOutputRestDto;

  @ApiProperty({
    ...DiarioFindOneQueryResultFields.disciplina.swaggerMetadata,
    type: () => DisciplinaFindOneOutputRestDto,
  })
  disciplina: DisciplinaFindOneOutputRestDto;

  @ApiPropertyOptional({
    ...DiarioFindOneQueryResultFields.ambientePadrao.swaggerMetadata,
    type: () => AmbienteFindOneOutputRestDto,
  })
  ambientePadrao: AmbienteFindOneOutputRestDto | null;

  @ApiPropertyOptional({
    ...DiarioFindOneQueryResultFields.imagemCapa.swaggerMetadata,
    type: () => ImagemFindOneOutputRestDto,
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
  @ApiProperty({ ...DiarioListQueryFields.meta.swaggerMetadata, type: () => PaginationMetaRestDto })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    ...DiarioListQueryFields.data.swaggerMetadata,
    type: () => [DiarioFindOneOutputRestDto],
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
    ...DiarioCreateCommandFields.calendarioLetivo.swaggerMetadata,
    type: () => CalendarioLetivoFindOneInputRestDto,
  })
  calendarioLetivo: CalendarioLetivoFindOneInputRestDto;

  @ApiProperty({
    ...DiarioCreateCommandFields.turma.swaggerMetadata,
    type: () => TurmaFindOneInputRestDto,
  })
  turma: TurmaFindOneInputRestDto;

  @ApiProperty({
    ...DiarioCreateCommandFields.disciplina.swaggerMetadata,
    type: () => DisciplinaFindOneInputRestDto,
  })
  disciplina: DisciplinaFindOneInputRestDto;

  @ApiPropertyOptional({
    ...DiarioCreateCommandFields.ambientePadrao.swaggerMetadata,
    nullable: true,
    type: () => AmbienteFindOneInputRestDto,
  })
  ambientePadrao?: AmbienteFindOneInputRestDto | null;
}

@ApiSchema({ name: "DiarioUpdateInputDto" })
export class DiarioUpdateInputRestDto extends PartialType(DiarioCreateInputRestDto) {
  static schema = DiarioUpdateSchema.presentation;
}

// ============================================================================
// Batch Create Input
// ============================================================================

@ApiSchema({ name: "DiarioBatchCreatePreferenciaAgrupamentoItemDto" })
export class DiarioBatchCreatePreferenciaAgrupamentoItemRestDto {
  @ApiProperty({
    type: "string",
    description: "Modo da preferencia: DEFINIDO ou POR_DIA_SEMANA",
    enum: ["DEFINIDO", "POR_DIA_SEMANA"],
  })
  modo: string;

  @ApiProperty({ type: "integer", description: "Ordem sequencial", minimum: 1 })
  ordem: number;

  @ApiProperty({ type: "string", description: "Inicio da vigencia" })
  dataInicio: string;

  @ApiPropertyOptional({ type: "string", description: "Fim da vigencia", nullable: true })
  dataFim?: string | null;

  @ApiPropertyOptional({
    type: "integer",
    description: "Dia da semana ISO (1=Seg, 7=Dom). Obrigatorio no modo POR_DIA_SEMANA.",
    minimum: 1,
    maximum: 7,
    nullable: true,
  })
  diaSemanaIso?: number | null;

  @ApiProperty({ type: "integer", description: "Quantidade de aulas seguidas", minimum: 1 })
  aulasSeguidas: number;
}

@ApiSchema({ name: "DiarioBatchCreateProfessorItemDto" })
export class DiarioBatchCreateProfessorItemRestDto {
  @ApiProperty({ type: "string", description: "ID do perfil (uuid)", format: "uuid" })
  perfilId: string;

  @ApiProperty({ type: "boolean", description: "Situacao do vinculo" })
  situacao: boolean;
}

@ApiSchema({ name: "DiarioBatchCreateDiarioItemDto" })
export class DiarioBatchCreateDiarioItemRestDto {
  @ApiProperty({
    ...DiarioCreateCommandFields.disciplina.swaggerMetadata,
    type: () => DisciplinaFindOneInputRestDto,
  })
  disciplina: DisciplinaFindOneInputRestDto;

  @ApiProperty(DiarioCreateCommandFields.ativo.swaggerMetadata)
  ativo: boolean;

  @ApiProperty({
    type: () => [DiarioBatchCreateProfessorItemRestDto],
    description: "Professores a vincular ao diario",
  })
  professores: DiarioBatchCreateProfessorItemRestDto[];

  @ApiProperty({
    type: () => [DiarioBatchCreatePreferenciaAgrupamentoItemRestDto],
    description: "Preferencias de agrupamento do diario",
  })
  preferenciasAgrupamento: DiarioBatchCreatePreferenciaAgrupamentoItemRestDto[];
}

@ApiSchema({ name: "DiarioBatchCreateInputDto" })
export class DiarioBatchCreateInputRestDto {
  @ApiProperty({
    ...DiarioCreateCommandFields.turma.swaggerMetadata,
    type: () => TurmaFindOneInputRestDto,
  })
  turma: TurmaFindOneInputRestDto;

  @ApiProperty({
    ...DiarioCreateCommandFields.calendarioLetivo.swaggerMetadata,
    type: () => CalendarioLetivoFindOneInputRestDto,
  })
  calendarioLetivo: CalendarioLetivoFindOneInputRestDto;

  @ApiProperty({
    type: () => [DiarioBatchCreateDiarioItemRestDto],
    description: "Lista de diarios a criar",
  })
  diarios: DiarioBatchCreateDiarioItemRestDto[];
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
