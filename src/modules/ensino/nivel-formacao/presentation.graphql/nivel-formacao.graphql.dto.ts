import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import { ArgsType, Field, InputType, ObjectType } from "@/shared/presentation/graphql";
import {
  nivelFormacaoCreateSchema,
  nivelFormacaoGraphqlListInputSchema,
  nivelFormacaoUpdateSchema,
} from "../domain/nivel-formacao.schemas";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("NivelFormacaoFindOneOutputDto")
export class NivelFormacaoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String) slug: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("NivelFormacaoCreateInputDto")
export class NivelFormacaoCreateInputGraphQlDto {
  static readonly schema = nivelFormacaoCreateSchema;

  @Field(() => String) slug: string;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("NivelFormacaoUpdateInputDto")
export class NivelFormacaoUpdateInputGraphQlDto {
  static readonly schema = nivelFormacaoUpdateSchema;

  @Field(() => String, { nullable: true })
  slug?: string;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class NivelFormacaoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = nivelFormacaoGraphqlListInputSchema;
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("NivelFormacaoListResult")
export class NivelFormacaoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [NivelFormacaoFindOneOutputGraphQlDto])
  data: NivelFormacaoFindOneOutputGraphQlDto[];
}
