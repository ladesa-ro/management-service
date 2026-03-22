import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/armazenamento/imagem-arquivo/presentation.graphql/imagem-arquivo.graphql.dto";
import {
  diarioCreateSchema,
  diarioGraphqlListInputSchema,
  diarioUpdateSchema,
} from "@/modules/ensino/diario/domain/diario.schemas";
import { CalendarioLetivoFindOneOutputGraphQlDto } from "@/modules/horarios/calendario-letivo/presentation.graphql/calendario-letivo.graphql.dto";
import { ArgsType, Field, InputType, Int, ObjectType } from "@/shared/presentation/graphql";

// ============================================================================
// Nested ref output DTOs
// ============================================================================

@ObjectType("TurmaFindOneOutputForDiarioDto")
export class TurmaFindOneOutputForDiarioGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String) periodo: string;
}

@ObjectType("DisciplinaFindOneOutputForDiarioDto")
export class DisciplinaFindOneOutputForDiarioGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String) nome: string;
  @Field(() => String) nomeAbreviado: string;
  @Field(() => Int) cargaHoraria: number;
}

@ObjectType("AmbienteFindOneOutputForDiarioDto")
export class AmbienteFindOneOutputForDiarioGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String) nome: string;
  @Field(() => String, { nullable: true }) descricao: string | null;
  @Field(() => String) codigo: string;
  @Field(() => Int, { nullable: true }) capacidade: number | null;
  @Field(() => String, { nullable: true }) tipo: string | null;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("DiarioFindOneOutputDto")
export class DiarioFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => Boolean) ativo: boolean;
  @Field(() => CalendarioLetivoFindOneOutputGraphQlDto)
  calendarioLetivo: CalendarioLetivoFindOneOutputGraphQlDto;
  @Field(() => TurmaFindOneOutputForDiarioGraphQlDto)
  turma: TurmaFindOneOutputForDiarioGraphQlDto;
  @Field(() => DisciplinaFindOneOutputForDiarioGraphQlDto)
  disciplina: DisciplinaFindOneOutputForDiarioGraphQlDto;
  @Field(() => AmbienteFindOneOutputForDiarioGraphQlDto, { nullable: true })
  ambientePadrao: AmbienteFindOneOutputForDiarioGraphQlDto | null;
  @Field(() => ImagemFindOneOutputGraphQlDto, { nullable: true })
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
  static schema = diarioCreateSchema;

  @Field(() => Boolean) ativo: boolean;

  @Field(() => CalendarioLetivoRefInputForDiarioGraphQlDto)
  calendarioLetivo: CalendarioLetivoRefInputForDiarioGraphQlDto;

  @Field(() => TurmaRefInputForDiarioGraphQlDto)
  turma: TurmaRefInputForDiarioGraphQlDto;

  @Field(() => DisciplinaRefInputForDiarioGraphQlDto)
  disciplina: DisciplinaRefInputForDiarioGraphQlDto;

  @Field(() => AmbienteRefInputForDiarioGraphQlDto, { nullable: true })
  ambientePadrao?: AmbienteRefInputForDiarioGraphQlDto | null;

  @Field(() => ImagemRefInputForDiarioGraphQlDto, { nullable: true })
  imagemCapa?: ImagemRefInputForDiarioGraphQlDto | null;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("DiarioUpdateInputDto")
export class DiarioUpdateInputGraphQlDto {
  static schema = diarioUpdateSchema;

  @Field(() => Boolean, { nullable: true })
  ativo?: boolean;

  @Field(() => CalendarioLetivoRefInputForDiarioGraphQlDto, { nullable: true })
  calendarioLetivo?: CalendarioLetivoRefInputForDiarioGraphQlDto;

  @Field(() => TurmaRefInputForDiarioGraphQlDto, { nullable: true })
  turma?: TurmaRefInputForDiarioGraphQlDto;

  @Field(() => DisciplinaRefInputForDiarioGraphQlDto, { nullable: true })
  disciplina?: DisciplinaRefInputForDiarioGraphQlDto;

  @Field(() => AmbienteRefInputForDiarioGraphQlDto, { nullable: true })
  ambientePadrao?: AmbienteRefInputForDiarioGraphQlDto | null;

  @Field(() => ImagemRefInputForDiarioGraphQlDto, { nullable: true })
  imagemCapa?: ImagemRefInputForDiarioGraphQlDto | null;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class DiarioListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = diarioGraphqlListInputSchema;

  @Field(() => [String], { nullable: true, description: "Filtro por ID da Turma" })
  filterTurmaId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID da Disciplina" })
  filterDisciplinaId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Calendario Letivo" })
  filterCalendarioLetivoId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Ambiente Padrão" })
  filterAmbientePadraoId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("DiarioListResult")
export class DiarioListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [DiarioFindOneOutputGraphQlDto])
  data: DiarioFindOneOutputGraphQlDto[];
}
