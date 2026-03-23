import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import { ModalidadeFindOneOutputGraphQlDto } from "@/modules/ensino/modalidade/presentation.graphql/modalidade.graphql.dto";
import { OfertaFormacaoGraphqlListInputSchema } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-list.query.schemas";
import { ArgsType, Field, InputType, ObjectType } from "@/shared/presentation/graphql";
import { OfertaFormacaoCreateCommandFields } from "../domain/commands/oferta-formacao-create.command";
import { OfertaFormacaoUpdateCommandFields } from "../domain/commands/oferta-formacao-update.command";
import {
  OfertaFormacaoCreateSchema,
  OfertaFormacaoUpdateSchema,
} from "../domain/oferta-formacao.schemas";
import { OfertaFormacaoFindOneQueryResultFields } from "../domain/queries/oferta-formacao-find-one.query.result";
import { OfertaFormacaoListQueryFields } from "../domain/queries/oferta-formacao-list.query";

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
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("OfertaFormacaoModalidadeRefInputDto")
export class OfertaFormacaoModalidadeRefInputGraphQlDto {
  @Field(() => String) id: string;
}

@InputType("OfertaFormacaoCreateInputDto")
export class OfertaFormacaoCreateInputGraphQlDto {
  static readonly schema = OfertaFormacaoCreateSchema.domain;

  @Field(() => String, OfertaFormacaoCreateCommandFields.nome.gqlMetadata) nome: string;
  @Field(() => String, OfertaFormacaoCreateCommandFields.slug.gqlMetadata) slug: string;
  @Field(
    () => OfertaFormacaoModalidadeRefInputGraphQlDto,
    OfertaFormacaoCreateCommandFields.modalidade.gqlMetadata,
  )
  modalidade: OfertaFormacaoModalidadeRefInputGraphQlDto;
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
  @Field(() => OfertaFormacaoModalidadeRefInputGraphQlDto, {
    nullable: true,
    ...OfertaFormacaoUpdateCommandFields.modalidade.gqlMetadata,
  })
  modalidade?: OfertaFormacaoModalidadeRefInputGraphQlDto;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class OfertaFormacaoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = OfertaFormacaoGraphqlListInputSchema;

  @Field(() => [String], OfertaFormacaoListQueryFields.filterModalidadeId.gqlMetadata)
  filterModalidadeId?: string[];
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
