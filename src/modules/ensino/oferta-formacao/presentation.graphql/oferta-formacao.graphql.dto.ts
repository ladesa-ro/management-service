import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import { ModalidadeFindOneOutputGraphQlDto } from "@/modules/ensino/modalidade/presentation.graphql/modalidade.graphql.dto";
import { ArgsType, Field, InputType, ObjectType } from "@/shared/presentation/graphql";
import {
  ofertaFormacaoCreateSchema,
  ofertaFormacaoGraphqlListInputSchema,
  ofertaFormacaoUpdateSchema,
} from "../domain/oferta-formacao.schemas";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("OfertaFormacaoFindOneOutputDto")
export class OfertaFormacaoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String) nome: string;
  @Field(() => String) slug: string;
  @Field(() => ModalidadeFindOneOutputGraphQlDto)
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
  static readonly schema = ofertaFormacaoCreateSchema;

  @Field(() => String) nome: string;
  @Field(() => String) slug: string;
  @Field(() => OfertaFormacaoModalidadeRefInputGraphQlDto)
  modalidade: OfertaFormacaoModalidadeRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("OfertaFormacaoUpdateInputDto")
export class OfertaFormacaoUpdateInputGraphQlDto {
  static readonly schema = ofertaFormacaoUpdateSchema;

  @Field(() => String, { nullable: true })
  nome?: string;
  @Field(() => String, { nullable: true })
  slug?: string;
  @Field(() => OfertaFormacaoModalidadeRefInputGraphQlDto, { nullable: true })
  modalidade?: OfertaFormacaoModalidadeRefInputGraphQlDto;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class OfertaFormacaoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = ofertaFormacaoGraphqlListInputSchema;

  @Field(() => [String], { nullable: true, description: "Filtro por ID da Modalidade" })
  filterModalidadeId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("OfertaFormacaoListResult")
export class OfertaFormacaoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [OfertaFormacaoFindOneOutputGraphQlDto])
  data: OfertaFormacaoFindOneOutputGraphQlDto[];
}
