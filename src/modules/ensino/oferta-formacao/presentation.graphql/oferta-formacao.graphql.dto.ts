import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import { CampusFindOneOutputGraphQlDto } from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.dto";
import { ModalidadeFindOneOutputGraphQlDto } from "@/modules/ensino/modalidade/presentation.graphql/modalidade.graphql.dto";
import { NivelFormacaoFindOneOutputGraphQlDto } from "@/modules/ensino/nivel-formacao/presentation.graphql/nivel-formacao.graphql.dto";
import { OfertaFormacaoGraphqlListInputSchema } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-list.query.schemas";
import { ArgsType, Field, InputType, Int, ObjectType } from "@/shared/presentation/graphql";
import { OfertaFormacaoCreateCommandFields } from "../domain/commands/oferta-formacao-create.command";
import { OfertaFormacaoUpdateCommandFields } from "../domain/commands/oferta-formacao-update.command";
import {
  OfertaFormacaoCreateSchema,
  OfertaFormacaoUpdateSchema,
} from "../domain/oferta-formacao.schemas";
import { OfertaFormacaoFindOneQueryResultFields } from "../domain/queries/oferta-formacao-find-one.query.result";
import { OfertaFormacaoListQueryFields } from "../domain/queries/oferta-formacao-list.query";

// ============================================================================
// Periodo/Etapa Output
// ============================================================================

@ObjectType("OfertaFormacaoPeriodoEtapaOutputDto")
export class OfertaFormacaoPeriodoEtapaOutputGraphQlDto {
  @Field(() => String) id: string;
  @Field(() => String) nome: string;
  @Field(() => String) cor: string;
}

@ObjectType("OfertaFormacaoPeriodoOutputDto")
export class OfertaFormacaoPeriodoOutputGraphQlDto {
  @Field(() => String) id: string;
  @Field(() => Int) numeroPeriodo: number;
  @Field(() => [OfertaFormacaoPeriodoEtapaOutputGraphQlDto])
  etapas: OfertaFormacaoPeriodoEtapaOutputGraphQlDto[];
}

// ============================================================================
// Periodo/Etapa Input
// ============================================================================

@InputType("OfertaFormacaoPeriodoEtapaInputDto")
export class OfertaFormacaoPeriodoEtapaInputGraphQlDto {
  @Field(() => String) nome: string;
  @Field(() => String) cor: string;
}

@InputType("OfertaFormacaoPeriodoInputDto")
export class OfertaFormacaoPeriodoInputGraphQlDto {
  @Field(() => Int) numeroPeriodo: number;
  @Field(() => [OfertaFormacaoPeriodoEtapaInputGraphQlDto])
  etapas: OfertaFormacaoPeriodoEtapaInputGraphQlDto[];
}

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("OfertaFormacaoFindOneOutputDto")
export class OfertaFormacaoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, OfertaFormacaoFindOneQueryResultFields.nome.gqlMetadata) nome: string;
  @Field(() => String, OfertaFormacaoFindOneQueryResultFields.slug.gqlMetadata) slug: string;
  @Field(
    () => ModalidadeFindOneOutputGraphQlDto,
    OfertaFormacaoFindOneQueryResultFields.modalidade.gqlMetadata,
  )
  modalidade: ModalidadeFindOneOutputGraphQlDto;

  @Field(
    () => CampusFindOneOutputGraphQlDto,
    OfertaFormacaoFindOneQueryResultFields.campus.gqlMetadata,
  )
  campus: CampusFindOneOutputGraphQlDto;

  @Field(
    () => [NivelFormacaoFindOneOutputGraphQlDto],
    OfertaFormacaoFindOneQueryResultFields.niveisFormacoes.gqlMetadata,
  )
  niveisFormacoes: NivelFormacaoFindOneOutputGraphQlDto[];

  @Field(
    () => [OfertaFormacaoPeriodoOutputGraphQlDto],
    OfertaFormacaoFindOneQueryResultFields.periodos.gqlMetadata,
  )
  periodos: OfertaFormacaoPeriodoOutputGraphQlDto[];
}

// ============================================================================
// Ref Input Types
// ============================================================================

@InputType("OfertaFormacaoModalidadeRefInputDto")
export class OfertaFormacaoModalidadeRefInputGraphQlDto {
  @Field(() => String) id: string;
}

@InputType("OfertaFormacaoCampusRefInputDto")
export class OfertaFormacaoCampusRefInputGraphQlDto {
  @Field(() => String) id: string;
}

@InputType("OfertaFormacaoNivelFormacaoRefInputDto")
export class OfertaFormacaoNivelFormacaoRefInputGraphQlDto {
  @Field(() => String) id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("OfertaFormacaoCreateInputDto")
export class OfertaFormacaoCreateInputGraphQlDto {
  static readonly schema = OfertaFormacaoCreateSchema.domain;

  @Field(() => String, OfertaFormacaoCreateCommandFields.nome.gqlMetadata) nome: string;
  @Field(() => String, OfertaFormacaoCreateCommandFields.slug.gqlMetadata) slug: string;

  @Field(() => Int, OfertaFormacaoCreateCommandFields.duracaoPeriodoEmMeses.gqlMetadata)
  duracaoPeriodoEmMeses: number;

  @Field(
    () => OfertaFormacaoModalidadeRefInputGraphQlDto,
    OfertaFormacaoCreateCommandFields.modalidade.gqlMetadata,
  )
  modalidade: OfertaFormacaoModalidadeRefInputGraphQlDto;

  @Field(
    () => OfertaFormacaoCampusRefInputGraphQlDto,
    OfertaFormacaoCreateCommandFields.campus.gqlMetadata,
  )
  campus: OfertaFormacaoCampusRefInputGraphQlDto;

  @Field(
    () => [OfertaFormacaoNivelFormacaoRefInputGraphQlDto],
    OfertaFormacaoCreateCommandFields.niveisFormacoes.gqlMetadata,
  )
  niveisFormacoes: OfertaFormacaoNivelFormacaoRefInputGraphQlDto[];

  @Field(
    () => [OfertaFormacaoPeriodoInputGraphQlDto],
    OfertaFormacaoCreateCommandFields.periodos.gqlMetadata,
  )
  periodos: OfertaFormacaoPeriodoInputGraphQlDto[];
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("OfertaFormacaoUpdateInputDto")
export class OfertaFormacaoUpdateInputGraphQlDto {
  static readonly schema = OfertaFormacaoUpdateSchema.domain;

  @Field(() => String, { nullable: true, ...OfertaFormacaoUpdateCommandFields.nome.gqlMetadata })
  nome?: string;
  @Field(() => String, { nullable: true, ...OfertaFormacaoUpdateCommandFields.slug.gqlMetadata })
  slug?: string;

  @Field(() => Int, {
    nullable: true,
    ...OfertaFormacaoUpdateCommandFields.duracaoPeriodoEmMeses.gqlMetadata,
  })
  duracaoPeriodoEmMeses?: number;

  @Field(() => OfertaFormacaoModalidadeRefInputGraphQlDto, {
    nullable: true,
    ...OfertaFormacaoUpdateCommandFields.modalidade.gqlMetadata,
  })
  modalidade?: OfertaFormacaoModalidadeRefInputGraphQlDto;

  @Field(() => OfertaFormacaoCampusRefInputGraphQlDto, {
    nullable: true,
    ...OfertaFormacaoUpdateCommandFields.campus.gqlMetadata,
  })
  campus?: OfertaFormacaoCampusRefInputGraphQlDto;

  @Field(() => [OfertaFormacaoNivelFormacaoRefInputGraphQlDto], {
    nullable: true,
    ...OfertaFormacaoUpdateCommandFields.niveisFormacoes.gqlMetadata,
  })
  niveisFormacoes?: OfertaFormacaoNivelFormacaoRefInputGraphQlDto[];

  @Field(() => [OfertaFormacaoPeriodoInputGraphQlDto], {
    nullable: true,
    ...OfertaFormacaoUpdateCommandFields.periodos.gqlMetadata,
  })
  periodos?: OfertaFormacaoPeriodoInputGraphQlDto[];
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class OfertaFormacaoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = OfertaFormacaoGraphqlListInputSchema;

  @Field(() => [String], OfertaFormacaoListQueryFields.filterModalidadeId.gqlMetadata)
  filterModalidadeId?: string[];

  @Field(() => [String], OfertaFormacaoListQueryFields.filterCampusId.gqlMetadata)
  filterCampusId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("OfertaFormacaoListResult")
export class OfertaFormacaoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto, OfertaFormacaoListQueryFields.meta.gqlMetadata)
  meta: PaginationMetaGraphQlDto;

  @Field(
    () => [OfertaFormacaoFindOneOutputGraphQlDto],
    OfertaFormacaoListQueryFields.data.gqlMetadata,
  )
  data: OfertaFormacaoFindOneOutputGraphQlDto[];
}
