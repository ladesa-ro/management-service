import { ArgsType, Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsArray, IsBoolean, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/@base/armazenamento/imagem-arquivo/presentation/graphql/imagem-arquivo.graphql.dto";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { DiarioFieldsMixin } from "@/modules/ensino/diario/presentation/diario.validation-mixin";
import { CalendarioLetivoFindOneOutputGraphQlDto } from "@/modules/horarios/calendario-letivo/presentation/graphql/calendario-letivo.graphql.dto";

// ============================================================================
// Nested ref output DTOs
// ============================================================================

@decorate(ObjectType("TurmaFindOneOutputForDiarioDto"))
export class TurmaFindOneOutputForDiarioGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String)) periodo: string;
}

@decorate(ObjectType("DisciplinaFindOneOutputForDiarioDto"))
export class DisciplinaFindOneOutputForDiarioGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String)) nome: string;
  @decorate(Field(() => String)) nomeAbreviado: string;
  @decorate(Field(() => Int)) cargaHoraria: number;
}

@decorate(ObjectType("AmbienteFindOneOutputForDiarioDto"))
export class AmbienteFindOneOutputForDiarioGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String)) nome: string;
  @decorate(Field(() => String, { nullable: true })) descricao: string | null;
  @decorate(Field(() => String)) codigo: string;
  @decorate(Field(() => Int, { nullable: true })) capacidade: number | null;
  @decorate(Field(() => String, { nullable: true })) tipo: string | null;
}

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("DiarioFindOneOutputDto"))
export class DiarioFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => Boolean)) ativo: boolean;
  @decorate(Field(() => CalendarioLetivoFindOneOutputGraphQlDto))
  calendarioLetivo: CalendarioLetivoFindOneOutputGraphQlDto;
  @decorate(Field(() => TurmaFindOneOutputForDiarioGraphQlDto))
  turma: TurmaFindOneOutputForDiarioGraphQlDto;
  @decorate(Field(() => DisciplinaFindOneOutputForDiarioGraphQlDto))
  disciplina: DisciplinaFindOneOutputForDiarioGraphQlDto;
  @decorate(Field(() => AmbienteFindOneOutputForDiarioGraphQlDto, { nullable: true }))
  ambientePadrao: AmbienteFindOneOutputForDiarioGraphQlDto | null;
  @decorate(Field(() => ImagemFindOneOutputGraphQlDto, { nullable: true }))
  imagemCapa: ImagemFindOneOutputGraphQlDto | null;
}

// ============================================================================
// Ref Input DTOs
// ============================================================================

@decorate(InputType("CalendarioLetivoRefInputForDiarioDto"))
export class CalendarioLetivoRefInputForDiarioGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("TurmaRefInputForDiarioDto"))
export class TurmaRefInputForDiarioGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("DisciplinaRefInputForDiarioDto"))
export class DisciplinaRefInputForDiarioGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("AmbienteRefInputForDiarioDto"))
export class AmbienteRefInputForDiarioGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("ImagemRefInputForDiarioDto"))
export class ImagemRefInputForDiarioGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("DiarioCreateInputDto"))
export class DiarioCreateInputGraphQlDto extends DiarioFieldsMixin {
  @decorate(Field(() => Boolean)) declare ativo: boolean;

  @decorate(Field(() => CalendarioLetivoRefInputForDiarioGraphQlDto))
  @decorate(ValidateNested())
  calendarioLetivo: CalendarioLetivoRefInputForDiarioGraphQlDto;

  @decorate(Field(() => TurmaRefInputForDiarioGraphQlDto))
  @decorate(ValidateNested())
  turma: TurmaRefInputForDiarioGraphQlDto;

  @decorate(Field(() => DisciplinaRefInputForDiarioGraphQlDto))
  @decorate(ValidateNested())
  disciplina: DisciplinaRefInputForDiarioGraphQlDto;

  @decorate(Field(() => AmbienteRefInputForDiarioGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  ambientePadrao?: AmbienteRefInputForDiarioGraphQlDto | null;

  @decorate(Field(() => ImagemRefInputForDiarioGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  imagemCapa?: ImagemRefInputForDiarioGraphQlDto | null;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("DiarioUpdateInputDto"))
export class DiarioUpdateInputGraphQlDto {
  @decorate(Field(() => Boolean, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsBoolean())
  ativo?: boolean;

  @decorate(Field(() => CalendarioLetivoRefInputForDiarioGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  calendarioLetivo?: CalendarioLetivoRefInputForDiarioGraphQlDto;

  @decorate(Field(() => TurmaRefInputForDiarioGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  turma?: TurmaRefInputForDiarioGraphQlDto;

  @decorate(Field(() => DisciplinaRefInputForDiarioGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  disciplina?: DisciplinaRefInputForDiarioGraphQlDto;

  @decorate(Field(() => AmbienteRefInputForDiarioGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  ambientePadrao?: AmbienteRefInputForDiarioGraphQlDto | null;

  @decorate(Field(() => ImagemRefInputForDiarioGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  imagemCapa?: ImagemRefInputForDiarioGraphQlDto | null;
}

// ============================================================================
// List Input
// ============================================================================

@decorate(ArgsType())
export class DiarioListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @decorate(Field(() => [String], { nullable: true, description: "Filtro por ID da Turma" }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterTurmaId?: string[];

  @decorate(Field(() => [String], { nullable: true, description: "Filtro por ID da Disciplina" }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterDisciplinaId?: string[];

  @decorate(
    Field(() => [String], { nullable: true, description: "Filtro por ID do Calendario Letivo" }),
  )
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterCalendarioLetivoId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("DiarioListResult"))
export class DiarioListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [DiarioFindOneOutputGraphQlDto]))
  data: DiarioFindOneOutputGraphQlDto[];
}
