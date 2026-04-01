import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import { AmbienteFields } from "@/modules/ambientes/ambiente/domain/ambiente.fields";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/armazenamento/imagem-arquivo/presentation.graphql/imagem-arquivo.graphql.dto";
import { DiarioCreateCommandFields } from "@/modules/ensino/diario/domain/commands/diario-create.command";
import { DiarioUpdateCommandFields } from "@/modules/ensino/diario/domain/commands/diario-update.command";
import {
  DiarioCreateSchema,
  DiarioUpdateSchema,
} from "@/modules/ensino/diario/domain/diario.schemas";
import { DiarioFindOneQueryResultFields } from "@/modules/ensino/diario/domain/queries/diario-find-one.query.result";
import { DiarioListQueryFields } from "@/modules/ensino/diario/domain/queries/diario-list.query";
import { DiarioGraphqlListInputSchema } from "@/modules/ensino/diario/domain/queries/diario-list.query.schemas";
import { DisciplinaFields } from "@/modules/ensino/disciplina/domain/disciplina.fields";
import { TurmaFields } from "@/modules/ensino/turma/domain/turma.fields";
import { CalendarioLetivoFindOneOutputGraphQlDto } from "@/modules/horarios/calendario-letivo/presentation.graphql/calendario-letivo.graphql.dto";
import { ArgsType, Field, InputType, Int, ObjectType } from "@/shared/presentation/graphql";

// ============================================================================
// Nested ref output DTOs
// ============================================================================

@ObjectType("TurmaFindOneOutputForDiarioDto")
export class TurmaFindOneOutputForDiarioGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, TurmaFields.periodo.gqlMetadata) periodo: string;
}

@ObjectType("DisciplinaFindOneOutputForDiarioDto")
export class DisciplinaFindOneOutputForDiarioGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, DisciplinaFields.nome.gqlMetadata) nome: string;
  @Field(() => String, DisciplinaFields.nomeAbreviado.gqlMetadata) nomeAbreviado: string;
  @Field(() => Int, DisciplinaFields.cargaHoraria.gqlMetadata) cargaHoraria: number;
}

@ObjectType("AmbienteFindOneOutputForDiarioDto")
export class AmbienteFindOneOutputForDiarioGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, AmbienteFields.nome.gqlMetadata) nome: string;
  @Field(() => String, AmbienteFields.descricao.gqlMetadata) descricao: string | null;
  @Field(() => String, AmbienteFields.codigo.gqlMetadata) codigo: string;
  @Field(() => Int, AmbienteFields.capacidade.gqlMetadata) capacidade: number | null;
  @Field(() => String, AmbienteFields.tipo.gqlMetadata) tipo: string | null;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("DiarioFindOneOutputDto")
export class DiarioFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => Boolean, DiarioFindOneQueryResultFields.ativo.gqlMetadata) ativo: boolean;
  @Field(
    () => CalendarioLetivoFindOneOutputGraphQlDto,
    DiarioFindOneQueryResultFields.calendarioLetivo.gqlMetadata,
  )
  calendarioLetivo: CalendarioLetivoFindOneOutputGraphQlDto;
  @Field(
    () => TurmaFindOneOutputForDiarioGraphQlDto,
    DiarioFindOneQueryResultFields.turma.gqlMetadata,
  )
  turma: TurmaFindOneOutputForDiarioGraphQlDto;
  @Field(
    () => DisciplinaFindOneOutputForDiarioGraphQlDto,
    DiarioFindOneQueryResultFields.disciplina.gqlMetadata,
  )
  disciplina: DisciplinaFindOneOutputForDiarioGraphQlDto;
  @Field(() => AmbienteFindOneOutputForDiarioGraphQlDto, {
    nullable: true,
    ...DiarioFindOneQueryResultFields.ambientePadrao.gqlMetadata,
  })
  ambientePadrao: AmbienteFindOneOutputForDiarioGraphQlDto | null;
  @Field(() => ImagemFindOneOutputGraphQlDto, {
    nullable: true,
    ...DiarioFindOneQueryResultFields.imagemCapa.gqlMetadata,
  })
  imagemCapa: ImagemFindOneOutputGraphQlDto | null;
}

// ============================================================================
// Ref Input DTOs
// ============================================================================

@InputType("CalendarioLetivoRefInputForDiarioDto")
export class CalendarioLetivoRefInputForDiarioGraphQlDto {
  @Field(() => String) id: string;
}

@InputType("TurmaRefInputForDiarioDto")
export class TurmaRefInputForDiarioGraphQlDto {
  @Field(() => String) id: string;
}

@InputType("DisciplinaRefInputForDiarioDto")
export class DisciplinaRefInputForDiarioGraphQlDto {
  @Field(() => String) id: string;
}

@InputType("AmbienteRefInputForDiarioDto")
export class AmbienteRefInputForDiarioGraphQlDto {
  @Field(() => String) id: string;
}

@InputType("ImagemRefInputForDiarioDto")
export class ImagemRefInputForDiarioGraphQlDto {
  @Field(() => String) id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("DiarioCreateInputDto")
export class DiarioCreateInputGraphQlDto {
  static schema = DiarioCreateSchema.domain;

  @Field(() => Boolean, DiarioCreateCommandFields.ativo.gqlMetadata) ativo: boolean;

  @Field(
    () => CalendarioLetivoRefInputForDiarioGraphQlDto,
    DiarioCreateCommandFields.calendarioLetivo.gqlMetadata,
  )
  calendarioLetivo: CalendarioLetivoRefInputForDiarioGraphQlDto;

  @Field(() => TurmaRefInputForDiarioGraphQlDto, DiarioCreateCommandFields.turma.gqlMetadata)
  turma: TurmaRefInputForDiarioGraphQlDto;

  @Field(
    () => DisciplinaRefInputForDiarioGraphQlDto,
    DiarioCreateCommandFields.disciplina.gqlMetadata,
  )
  disciplina: DisciplinaRefInputForDiarioGraphQlDto;

  @Field(() => AmbienteRefInputForDiarioGraphQlDto, {
    nullable: true,
    ...DiarioCreateCommandFields.ambientePadrao.gqlMetadata,
  })
  ambientePadrao?: AmbienteRefInputForDiarioGraphQlDto | null;

  @Field(() => ImagemRefInputForDiarioGraphQlDto, {
    nullable: true,
    ...DiarioCreateCommandFields.imagemCapa.gqlMetadata,
  })
  imagemCapa?: ImagemRefInputForDiarioGraphQlDto | null;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("DiarioUpdateInputDto")
export class DiarioUpdateInputGraphQlDto {
  static schema = DiarioUpdateSchema.domain;

  @Field(() => Boolean, { nullable: true, ...DiarioUpdateCommandFields.ativo.gqlMetadata })
  ativo?: boolean;

  @Field(() => CalendarioLetivoRefInputForDiarioGraphQlDto, {
    nullable: true,
    ...DiarioUpdateCommandFields.calendarioLetivo.gqlMetadata,
  })
  calendarioLetivo?: CalendarioLetivoRefInputForDiarioGraphQlDto;

  @Field(() => TurmaRefInputForDiarioGraphQlDto, {
    nullable: true,
    ...DiarioUpdateCommandFields.turma.gqlMetadata,
  })
  turma?: TurmaRefInputForDiarioGraphQlDto;

  @Field(() => DisciplinaRefInputForDiarioGraphQlDto, {
    nullable: true,
    ...DiarioUpdateCommandFields.disciplina.gqlMetadata,
  })
  disciplina?: DisciplinaRefInputForDiarioGraphQlDto;

  @Field(() => AmbienteRefInputForDiarioGraphQlDto, {
    nullable: true,
    ...DiarioUpdateCommandFields.ambientePadrao.gqlMetadata,
  })
  ambientePadrao?: AmbienteRefInputForDiarioGraphQlDto | null;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class DiarioListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = DiarioGraphqlListInputSchema;

  @Field(() => [String], DiarioListQueryFields.filterTurmaId.gqlMetadata)
  filterTurmaId?: string[];

  @Field(() => [String], DiarioListQueryFields.filterDisciplinaId.gqlMetadata)
  filterDisciplinaId?: string[];

  @Field(() => [String], DiarioListQueryFields.filterCalendarioLetivoId.gqlMetadata)
  filterCalendarioLetivoId?: string[];

  @Field(() => [String], DiarioListQueryFields.filterAmbientePadraoId.gqlMetadata)
  filterAmbientePadraoId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("DiarioListResult")
export class DiarioListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto, DiarioListQueryFields.meta.gqlMetadata)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [DiarioFindOneOutputGraphQlDto], DiarioListQueryFields.data.gqlMetadata)
  data: DiarioFindOneOutputGraphQlDto[];
}
