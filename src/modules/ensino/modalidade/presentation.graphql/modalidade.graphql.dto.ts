import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import { ArgsType, Field, InputType, ObjectType } from "@/shared/presentation/graphql";
import {
  modalidadeCreateSchema,
  modalidadeGraphqlListInputSchema,
  modalidadeUpdateSchema,
} from "../domain/modalidade.schemas";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("ModalidadeFindOneOutputDto")
export class ModalidadeFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String) nome: string;
  @Field(() => String) slug: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("ModalidadeCreateInputDto")
export class ModalidadeCreateInputGraphQlDto {
  static readonly schema = modalidadeCreateSchema;

  @Field(() => String) nome: string;
  @Field(() => String) slug: string;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("ModalidadeUpdateInputDto")
export class ModalidadeUpdateInputGraphQlDto {
  static readonly schema = modalidadeUpdateSchema;

  @Field(() => String, { nullable: true })
  nome?: string;
  @Field(() => String, { nullable: true })
  slug?: string;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class ModalidadeListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = modalidadeGraphqlListInputSchema;
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("ModalidadeListResult")
export class ModalidadeListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [ModalidadeFindOneOutputGraphQlDto])
  data: ModalidadeFindOneOutputGraphQlDto[];
}
