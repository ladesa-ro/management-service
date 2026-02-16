import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsOptional, IsString, MinLength } from "class-validator";
import { decorate } from "ts-mixer";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { ModalidadeFieldsMixin } from "../modalidade.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("ModalidadeFindOneOutputDto"))
export class ModalidadeFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String)) nome: string;
  @decorate(Field(() => String)) slug: string;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("ModalidadeCreateInputDto"))
export class ModalidadeCreateInputGraphQlDto extends ModalidadeFieldsMixin {
  @decorate(Field(() => String)) declare nome: string;
  @decorate(Field(() => String)) declare slug: string;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("ModalidadeUpdateInputDto"))
export class ModalidadeUpdateInputGraphQlDto {
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
}

// ============================================================================
// List Input
// ============================================================================

@decorate(ArgsType())
export class ModalidadeListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("ModalidadeListResult"))
export class ModalidadeListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [ModalidadeFindOneOutputGraphQlDto]))
  data: ModalidadeFindOneOutputGraphQlDto[];
}
