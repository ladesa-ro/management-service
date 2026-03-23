import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import { ModalidadeGraphqlListInputSchema } from "@/modules/ensino/modalidade/domain/queries/modalidade-list.query.schemas";
import { ArgsType, Field, InputType, ObjectType } from "@/shared/presentation/graphql";
import { ModalidadeCreateCommandFields } from "../domain/commands/modalidade-create.command";
import { ModalidadeUpdateCommandFields } from "../domain/commands/modalidade-update.command";
import { ModalidadeCreateSchema, ModalidadeUpdateSchema } from "../domain/modalidade.schemas";
import { ModalidadeFindOneQueryResultFields } from "../domain/queries/modalidade-find-one.query.result";
import { ModalidadeListQueryFields } from "../domain/queries/modalidade-list.query";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("ModalidadeFindOneOutputDto")
export class ModalidadeFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, ModalidadeFindOneQueryResultFields.nome.gqlMetadata) nome: string;
  @Field(() => String, ModalidadeFindOneQueryResultFields.slug.gqlMetadata) slug: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("ModalidadeCreateInputDto")
export class ModalidadeCreateInputGraphQlDto {
  static readonly schema = ModalidadeCreateSchema.domain;

  @Field(() => String, ModalidadeCreateCommandFields.nome.gqlMetadata) nome: string;
  @Field(() => String, ModalidadeCreateCommandFields.slug.gqlMetadata) slug: string;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("ModalidadeUpdateInputDto")
export class ModalidadeUpdateInputGraphQlDto {
  static readonly schema = ModalidadeUpdateSchema.domain;

  @Field(() => String, { nullable: true, ...ModalidadeUpdateCommandFields.nome.gqlMetadata })
  nome?: string;
  @Field(() => String, { nullable: true, ...ModalidadeUpdateCommandFields.slug.gqlMetadata })
  slug?: string;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class ModalidadeListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = ModalidadeGraphqlListInputSchema;
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("ModalidadeListResult")
export class ModalidadeListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto, ModalidadeListQueryFields.meta.gqlMetadata)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [ModalidadeFindOneOutputGraphQlDto], ModalidadeListQueryFields.data.gqlMetadata)
  data: ModalidadeFindOneOutputGraphQlDto[];
}
