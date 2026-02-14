import { ArgsType, Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsArray, IsBoolean, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { PaginationInputGraphQlDto } from "@/modules/@shared/infrastructure/graphql/dtos/pagination-graphql.dto";
import { CalendarioLetivoFindOneOutputGraphQlDto } from "@/server/nest/modules/calendario-letivo/graphql/calendario-letivo.graphql.dto";
import { ImagemFindOneOutputGraphQlDto } from "@/server/nest/modules/imagem-arquivo/graphql/imagem-arquivo.graphql.dto";

// ============================================================================
// Nested ref output DTOs
// ============================================================================

@ObjectType("TurmaFindOneOutputForDiarioDto")
export class TurmaFindOneOutputForDiarioGraphQlDto extends EntityBaseGraphQlDto {
  @Field() periodo: string;
}

@ObjectType("DisciplinaFindOneOutputForDiarioDto")
export class DisciplinaFindOneOutputForDiarioGraphQlDto extends EntityBaseGraphQlDto {
  @Field() nome: string;
  @Field() nomeAbreviado: string;
  @Field(() => Int) cargaHoraria: number;
}

@ObjectType("AmbienteFindOneOutputForDiarioDto")
export class AmbienteFindOneOutputForDiarioGraphQlDto extends EntityBaseGraphQlDto {
  @Field() nome: string;
  @Field(() => String, { nullable: true }) descricao: string | null;
  @Field() codigo: string;
  @Field(() => Int, { nullable: true }) capacidade: number | null;
  @Field(() => String, { nullable: true }) tipo: string | null;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("DiarioFindOneOutputDto")
export class DiarioFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() ativo: boolean;
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
  @Field() @IsString() id: string;
}

@InputType("TurmaRefInputForDiarioDto")
export class TurmaRefInputForDiarioGraphQlDto {
  @Field() @IsString() id: string;
}

@InputType("DisciplinaRefInputForDiarioDto")
export class DisciplinaRefInputForDiarioGraphQlDto {
  @Field() @IsString() id: string;
}

@InputType("AmbienteRefInputForDiarioDto")
export class AmbienteRefInputForDiarioGraphQlDto {
  @Field() @IsString() id: string;
}

@InputType("ImagemRefInputForDiarioDto")
export class ImagemRefInputForDiarioGraphQlDto {
  @Field() @IsString() id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("DiarioCreateInputDto")
export class DiarioCreateInputGraphQlDto {
  @Field() @IsBoolean() ativo: boolean;

  @Field(() => CalendarioLetivoRefInputForDiarioGraphQlDto)
  @ValidateNested()
  calendarioLetivo: CalendarioLetivoRefInputForDiarioGraphQlDto;

  @Field(() => TurmaRefInputForDiarioGraphQlDto)
  @ValidateNested()
  turma: TurmaRefInputForDiarioGraphQlDto;

  @Field(() => DisciplinaRefInputForDiarioGraphQlDto)
  @ValidateNested()
  disciplina: DisciplinaRefInputForDiarioGraphQlDto;

  @Field(() => AmbienteRefInputForDiarioGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  ambientePadrao?: AmbienteRefInputForDiarioGraphQlDto | null;

  @Field(() => ImagemRefInputForDiarioGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  imagemCapa?: ImagemRefInputForDiarioGraphQlDto | null;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("DiarioUpdateInputDto")
export class DiarioUpdateInputGraphQlDto {
  @Field({ nullable: true }) @IsOptional() @IsBoolean() ativo?: boolean;

  @Field(() => CalendarioLetivoRefInputForDiarioGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  calendarioLetivo?: CalendarioLetivoRefInputForDiarioGraphQlDto;

  @Field(() => TurmaRefInputForDiarioGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  turma?: TurmaRefInputForDiarioGraphQlDto;

  @Field(() => DisciplinaRefInputForDiarioGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  disciplina?: DisciplinaRefInputForDiarioGraphQlDto;

  @Field(() => AmbienteRefInputForDiarioGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  ambientePadrao?: AmbienteRefInputForDiarioGraphQlDto | null;

  @Field(() => ImagemRefInputForDiarioGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  imagemCapa?: ImagemRefInputForDiarioGraphQlDto | null;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class DiarioListInputGraphQlDto extends PaginationInputGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID da Turma" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterTurmaId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID da Disciplina" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterDisciplinaId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Calendario Letivo" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterCalendarioLetivoId?: string[];
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
