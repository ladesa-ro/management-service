import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString, IsUUID, MinLength, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { ModalidadeFindOneOutputGraphQlDto } from "@/server/nest/modules/modalidade/graphql/modalidade.graphql.dto";
import { OfertaFormacaoFieldsMixin } from "@/server/nest/modules/oferta-formacao/oferta-formacao.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("OfertaFormacaoFindOneOutputDto"))
export class OfertaFormacaoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String)) nome: string;
  @decorate(Field(() => String)) slug: string;
  @decorate(Field(() => ModalidadeFindOneOutputGraphQlDto))
  modalidade: ModalidadeFindOneOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("OfertaFormacaoModalidadeRefInputDto"))
export class OfertaFormacaoModalidadeRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("OfertaFormacaoCreateInputDto"))
export class OfertaFormacaoCreateInputGraphQlDto extends OfertaFormacaoFieldsMixin {
  @decorate(Field(() => String)) declare nome: string;
  @decorate(Field(() => String)) declare slug: string;
  @decorate(Field(() => OfertaFormacaoModalidadeRefInputGraphQlDto))
  @decorate(ValidateNested())
  modalidade: OfertaFormacaoModalidadeRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("OfertaFormacaoUpdateInputDto"))
export class OfertaFormacaoUpdateInputGraphQlDto {
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  nome?: string;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  slug?: string;
  @decorate(Field(() => OfertaFormacaoModalidadeRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  modalidade?: OfertaFormacaoModalidadeRefInputGraphQlDto;
}

// ============================================================================
// List Input
// ============================================================================

@decorate(ArgsType())
export class OfertaFormacaoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @decorate(Field(() => [String], { nullable: true, description: "Filtro por ID da Modalidade" }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterModalidadeId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("OfertaFormacaoListResult"))
export class OfertaFormacaoListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [OfertaFormacaoFindOneOutputGraphQlDto]))
  data: OfertaFormacaoFindOneOutputGraphQlDto[];
}
