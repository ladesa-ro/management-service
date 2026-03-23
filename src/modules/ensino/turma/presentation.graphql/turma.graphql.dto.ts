import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import { AmbienteFindOneOutputGraphQlDto } from "@/modules/ambientes/ambiente/presentation.graphql/ambiente.graphql.dto";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/armazenamento/imagem-arquivo/presentation.graphql/imagem-arquivo.graphql.dto";
import { CursoFindOneOutputGraphQlDto } from "@/modules/ensino/curso/presentation.graphql/curso.graphql.dto";
import { TurmaGraphqlListInputSchema } from "@/modules/ensino/turma/domain/queries/turma-list.query.schemas";
import { ArgsType, Field, InputType, ObjectType } from "@/shared/presentation/graphql";
import { TurmaCreateCommandFields } from "../domain/commands/turma-create.command";
import { TurmaUpdateCommandFields } from "../domain/commands/turma-update.command";
import { TurmaFindOneQueryResultFields } from "../domain/queries/turma-find-one.query.result";
import { TurmaListQueryFields } from "../domain/queries/turma-list.query";
import { TurmaCreateSchema, TurmaUpdateSchema } from "../domain/turma.schemas";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("TurmaFindOneOutputDto")
export class TurmaFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, TurmaFindOneQueryResultFields.periodo.gqlMetadata) periodo: string;
  @Field(() => CursoFindOneOutputGraphQlDto, TurmaFindOneQueryResultFields.curso.gqlMetadata)
  curso: CursoFindOneOutputGraphQlDto;
  @Field(() => AmbienteFindOneOutputGraphQlDto, {
    nullable: true,
    ...TurmaFindOneQueryResultFields.ambientePadraoAula.gqlMetadata,
  })
  ambientePadraoAula: AmbienteFindOneOutputGraphQlDto | null;
  @Field(() => ImagemFindOneOutputGraphQlDto, {
    nullable: true,
    ...TurmaFindOneQueryResultFields.imagemCapa.gqlMetadata,
  })
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
  static readonly schema = TurmaCreateSchema.domain;

  @Field(() => String, TurmaCreateCommandFields.periodo.gqlMetadata) periodo: string;
  @Field(() => TurmaCursoRefInputGraphQlDto, TurmaCreateCommandFields.curso.gqlMetadata)
  curso: TurmaCursoRefInputGraphQlDto;
  @Field(() => TurmaAmbienteRefInputGraphQlDto, {
    nullable: true,
    ...TurmaCreateCommandFields.ambientePadraoAula.gqlMetadata,
  })
  ambientePadraoAula?: TurmaAmbienteRefInputGraphQlDto | null;
  @Field(() => TurmaImagemCapaRefInputGraphQlDto, {
    nullable: true,
    ...TurmaCreateCommandFields.imagemCapa.gqlMetadata,
  })
  imagemCapa?: TurmaImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("TurmaUpdateInputDto")
export class TurmaUpdateInputGraphQlDto {
  static readonly schema = TurmaUpdateSchema.domain;

  @Field(() => String, { nullable: true, ...TurmaUpdateCommandFields.periodo.gqlMetadata })
  periodo?: string;
  @Field(() => TurmaCursoRefInputGraphQlDto, {
    nullable: true,
    ...TurmaUpdateCommandFields.curso.gqlMetadata,
  })
  curso?: TurmaCursoRefInputGraphQlDto;
  @Field(() => TurmaAmbienteRefInputGraphQlDto, {
    nullable: true,
    ...TurmaUpdateCommandFields.ambientePadraoAula.gqlMetadata,
  })
  ambientePadraoAula?: TurmaAmbienteRefInputGraphQlDto | null;
  @Field(() => TurmaImagemCapaRefInputGraphQlDto, {
    nullable: true,
    ...TurmaUpdateCommandFields.imagemCapa.gqlMetadata,
  })
  imagemCapa?: TurmaImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class TurmaListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = TurmaGraphqlListInputSchema;

  @Field(() => [String], TurmaListQueryFields.filterAmbientePadraoAulaNome.gqlMetadata)
  filterAmbientePadraoAulaNome?: string[];

  @Field(() => [String], TurmaListQueryFields.filterAmbientePadraoAulaCodigo.gqlMetadata)
  filterAmbientePadraoAulaCodigo?: string[];

  @Field(() => [String], TurmaListQueryFields.filterAmbientePadraoAulaCapacidade.gqlMetadata)
  filterAmbientePadraoAulaCapacidade?: string[];

  @Field(() => [String], TurmaListQueryFields.filterAmbientePadraoAulaTipo.gqlMetadata)
  filterAmbientePadraoAulaTipo?: string[];

  @Field(() => [String], TurmaListQueryFields.filterCursoId.gqlMetadata)
  filterCursoId?: string[];

  @Field(() => [String], TurmaListQueryFields.filterCursoNome.gqlMetadata)
  filterCursoNome?: string[];

  @Field(() => [String], TurmaListQueryFields.filterCursoNomeAbreviado.gqlMetadata)
  filterCursoNomeAbreviado?: string[];

  @Field(() => [String], TurmaListQueryFields.filterCursoCampusId.gqlMetadata)
  filterCursoCampusId?: string[];

  @Field(() => [String], TurmaListQueryFields.filterCursoOfertaFormacaoId.gqlMetadata)
  filterCursoOfertaFormacaoId?: string[];

  @Field(() => [String], TurmaListQueryFields.filterCursoOfertaFormacaoNome.gqlMetadata)
  filterCursoOfertaFormacaoNome?: string[];

  @Field(() => [String], TurmaListQueryFields.filterCursoOfertaFormacaoSlug.gqlMetadata)
  filterCursoOfertaFormacaoSlug?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("TurmaListResult")
export class TurmaListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto, TurmaListQueryFields.meta.gqlMetadata)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [TurmaFindOneOutputGraphQlDto], TurmaListQueryFields.data.gqlMetadata)
  data: TurmaFindOneOutputGraphQlDto[];
}
