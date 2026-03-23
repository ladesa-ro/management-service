import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import { NivelFormacaoGraphqlListInputSchema } from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-list.query.schemas";
import { ArgsType, Field, InputType, ObjectType } from "@/shared/presentation/graphql";
import { NivelFormacaoCreateCommandFields } from "../domain/commands/nivel-formacao-create.command";
import { NivelFormacaoUpdateCommandFields } from "../domain/commands/nivel-formacao-update.command";
import {
  NivelFormacaoCreateSchema,
  NivelFormacaoUpdateSchema,
} from "../domain/nivel-formacao.schemas";
import { NivelFormacaoFindOneQueryResultFields } from "../domain/queries/nivel-formacao-find-one.query.result";
import { NivelFormacaoListQueryFields } from "../domain/queries/nivel-formacao-list.query";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("NivelFormacaoFindOneOutputDto")
export class NivelFormacaoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, NivelFormacaoFindOneQueryResultFields.slug.gqlMetadata) slug: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("NivelFormacaoCreateInputDto")
export class NivelFormacaoCreateInputGraphQlDto {
  static readonly schema = NivelFormacaoCreateSchema.domain;

  @Field(() => String, NivelFormacaoCreateCommandFields.slug.gqlMetadata) slug: string;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("NivelFormacaoUpdateInputDto")
export class NivelFormacaoUpdateInputGraphQlDto {
  static readonly schema = NivelFormacaoUpdateSchema.domain;

  @Field(() => String, { nullable: true, ...NivelFormacaoUpdateCommandFields.slug.gqlMetadata })
  slug?: string;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class NivelFormacaoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = NivelFormacaoGraphqlListInputSchema;
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("NivelFormacaoListResult")
export class NivelFormacaoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto, NivelFormacaoListQueryFields.meta.gqlMetadata)
  meta: PaginationMetaGraphQlDto;

  @Field(
    () => [NivelFormacaoFindOneOutputGraphQlDto],
    NivelFormacaoListQueryFields.data.gqlMetadata,
  )
  data: NivelFormacaoFindOneOutputGraphQlDto[];
}
