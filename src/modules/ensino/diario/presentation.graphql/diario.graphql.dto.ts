import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import {
  ArgsType,
  Field,
  InputType,
  Int,
  ObjectType,
} from "@/modules/@shared/presentation/graphql";
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/armazenamento/imagem-arquivo/presentation.graphql/imagem-arquivo.graphql.dto";
import { DiarioFieldsMixin } from "@/modules/ensino/diario/presentation.validations/diario.validation-mixin";
import { CalendarioLetivoFindOneOutputGraphQlDto } from "@/modules/horarios/calendario-letivo/presentation.graphql/calendario-letivo.graphql.dto";

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
  @Field(() => String) @IsString() id: string;
}

@InputType("TurmaRefInputForDiarioDto")
export class TurmaRefInputForDiarioGraphQlDto {
  @Field(() => String) @IsString() id: string;
}

@InputType("DisciplinaRefInputForDiarioDto")
export class DisciplinaRefInputForDiarioGraphQlDto {
  @Field(() => String) @IsString() id: string;
}

@InputType("AmbienteRefInputForDiarioDto")
export class AmbienteRefInputForDiarioGraphQlDto {
  @Field(() => String) @IsString() id: string;
}

@InputType("ImagemRefInputForDiarioDto")
export class ImagemRefInputForDiarioGraphQlDto {
  @Field(() => String) @IsString() id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("DiarioCreateInputDto")
export class DiarioCreateInputGraphQlDto extends DiarioFieldsMixin {
  @Field(() => Boolean) declare ativo: boolean;

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
  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  ativo?: boolean;

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
export class DiarioListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
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

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Ambiente Padrão" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
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
