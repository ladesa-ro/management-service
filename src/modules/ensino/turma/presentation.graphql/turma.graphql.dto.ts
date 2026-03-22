import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import { AmbienteFindOneOutputGraphQlDto } from "@/modules/ambientes/ambiente/presentation.graphql/ambiente.graphql.dto";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/armazenamento/imagem-arquivo/presentation.graphql/imagem-arquivo.graphql.dto";
import { CursoFindOneOutputGraphQlDto } from "@/modules/ensino/curso/presentation.graphql/curso.graphql.dto";
import { ArgsType, Field, InputType, ObjectType } from "@/shared/presentation/graphql";
import {
  turmaCreateSchema,
  turmaGraphqlListInputSchema,
  turmaUpdateSchema,
} from "../domain/turma.schemas";

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
  @Field(() => String) id: string;
}

@InputType("TurmaAmbienteRefInputDto")
export class TurmaAmbienteRefInputGraphQlDto {
  @Field(() => String) id: string;
}

@InputType("TurmaImagemCapaRefInputDto")
export class TurmaImagemCapaRefInputGraphQlDto {
  @Field(() => String) id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("TurmaCreateInputDto")
export class TurmaCreateInputGraphQlDto {
  static readonly schema = turmaCreateSchema;

  @Field(() => String) periodo: string;
  @Field(() => TurmaCursoRefInputGraphQlDto)
  curso: TurmaCursoRefInputGraphQlDto;
  @Field(() => TurmaAmbienteRefInputGraphQlDto, { nullable: true })
  ambientePadraoAula?: TurmaAmbienteRefInputGraphQlDto | null;
  @Field(() => TurmaImagemCapaRefInputGraphQlDto, { nullable: true })
  imagemCapa?: TurmaImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("TurmaUpdateInputDto")
export class TurmaUpdateInputGraphQlDto {
  static readonly schema = turmaUpdateSchema;

  @Field(() => String, { nullable: true })
  periodo?: string;
  @Field(() => TurmaCursoRefInputGraphQlDto, { nullable: true })
  curso?: TurmaCursoRefInputGraphQlDto;
  @Field(() => TurmaAmbienteRefInputGraphQlDto, { nullable: true })
  ambientePadraoAula?: TurmaAmbienteRefInputGraphQlDto | null;
  @Field(() => TurmaImagemCapaRefInputGraphQlDto, { nullable: true })
  imagemCapa?: TurmaImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class TurmaListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = turmaGraphqlListInputSchema;

  @Field(() => [String], {
    nullable: true,
    description: "Filtro por Nome do Ambiente Padrao de Aula",
  })
  filterAmbientePadraoAulaNome?: string[];

  @Field(() => [String], {
    nullable: true,
    description: "Filtro por Codigo do Ambiente Padrao de Aula",
  })
  filterAmbientePadraoAulaCodigo?: string[];

  @Field(() => [String], {
    nullable: true,
    description: "Filtro por Capacidade do Ambiente Padrao de Aula",
  })
  filterAmbientePadraoAulaCapacidade?: string[];

  @Field(() => [String], {
    nullable: true,
    description: "Filtro por Tipo do Ambiente Padrao de Aula",
  })
  filterAmbientePadraoAulaTipo?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Curso" })
  filterCursoId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por Nome do Curso" })
  filterCursoNome?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por Nome Abreviado do Curso" })
  filterCursoNomeAbreviado?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Campus do Curso" })
  filterCursoCampusId?: string[];

  @Field(() => [String], {
    nullable: true,
    description: "Filtro por ID da Oferta de Formacao do Curso",
  })
  filterCursoOfertaFormacaoId?: string[];

  @Field(() => [String], {
    nullable: true,
    description: "Filtro por Nome da Oferta de Formacao do Curso",
  })
  filterCursoOfertaFormacaoNome?: string[];

  @Field(() => [String], {
    nullable: true,
    description: "Filtro por Slug da Oferta de Formacao do Curso",
  })
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
