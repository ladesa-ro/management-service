import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { ArgsType, Field, InputType, ObjectType } from "@/modules/@shared/presentation/graphql";
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import { AmbienteFindOneOutputGraphQlDto } from "@/modules/ambientes/ambiente/presentation.graphql/ambiente.graphql.dto";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/armazenamento/imagem-arquivo/presentation.graphql/imagem-arquivo.graphql.dto";
import { CursoFindOneOutputGraphQlDto } from "@/modules/ensino/curso/presentation.graphql/curso.graphql.dto";
import { TurmaFieldsMixin } from "@/modules/ensino/turma/presentation.validations/turma.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("TurmaFindOneOutputDto")
export class TurmaFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String) periodo: string;
  @Field(() => CursoFindOneOutputGraphQlDto) curso: CursoFindOneOutputGraphQlDto;
  @Field(() => AmbienteFindOneOutputGraphQlDto, { nullable: true })
  ambientePadraoAula: AmbienteFindOneOutputGraphQlDto | null;
  @Field(() => ImagemFindOneOutputGraphQlDto, { nullable: true })
  imagemCapa: ImagemFindOneOutputGraphQlDto | null;
}

// ============================================================================
// Ref Inputs
// ============================================================================

@InputType("TurmaCursoRefInputDto")
export class TurmaCursoRefInputGraphQlDto {
  @Field(() => String) @IsString() id: string;
}

@InputType("TurmaAmbienteRefInputDto")
export class TurmaAmbienteRefInputGraphQlDto {
  @Field(() => String) @IsString() id: string;
}

@InputType("TurmaImagemCapaRefInputDto")
export class TurmaImagemCapaRefInputGraphQlDto {
  @Field(() => String) @IsString() id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("TurmaCreateInputDto")
export class TurmaCreateInputGraphQlDto extends TurmaFieldsMixin {
  @Field(() => String) declare periodo: string;
  @Field(() => TurmaCursoRefInputGraphQlDto)
  @ValidateNested()
  curso: TurmaCursoRefInputGraphQlDto;
  @Field(() => TurmaAmbienteRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  ambientePadraoAula?: TurmaAmbienteRefInputGraphQlDto | null;
  @Field(() => TurmaImagemCapaRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  imagemCapa?: TurmaImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("TurmaUpdateInputDto")
export class TurmaUpdateInputGraphQlDto {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  periodo?: string;
  @Field(() => TurmaCursoRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  curso?: TurmaCursoRefInputGraphQlDto;
  @Field(() => TurmaAmbienteRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  ambientePadraoAula?: TurmaAmbienteRefInputGraphQlDto | null;
  @Field(() => TurmaImagemCapaRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  imagemCapa?: TurmaImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class TurmaListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por Nome do Ambiente Padrao de Aula" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterAmbientePadraoAulaNome?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por Codigo do Ambiente Padrao de Aula" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterAmbientePadraoAulaCodigo?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por Capacidade do Ambiente Padrao de Aula" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterAmbientePadraoAulaCapacidade?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por Tipo do Ambiente Padrao de Aula" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterAmbientePadraoAulaTipo?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Curso" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterCursoId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por Nome do Curso" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterCursoNome?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por Nome Abreviado do Curso" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterCursoNomeAbreviado?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Campus do Curso" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterCursoCampusId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID da Oferta de Formacao do Curso" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterCursoOfertaFormacaoId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por Nome da Oferta de Formacao do Curso" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterCursoOfertaFormacaoNome?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por Slug da Oferta de Formacao do Curso" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterCursoOfertaFormacaoSlug?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("TurmaListResult")
export class TurmaListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [TurmaFindOneOutputGraphQlDto])
  data: TurmaFindOneOutputGraphQlDto[];
}
