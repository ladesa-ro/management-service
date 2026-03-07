import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsOptional, IsString, MinLength } from "class-validator";
import { decorate } from "ts-mixer";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Abstractions";
import { NivelFormacaoFieldsMixin } from "@/Ladesa.Management.Server.Api/Validation/NivelFormacaoValidationMixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("NivelFormacaoFindOneOutputDto"))
export class NivelFormacaoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String)) slug: string;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("NivelFormacaoCreateInputDto"))
export class NivelFormacaoCreateInputGraphQlDto extends NivelFormacaoFieldsMixin {
  @decorate(Field(() => String)) declare slug: string;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("NivelFormacaoUpdateInputDto"))
export class NivelFormacaoUpdateInputGraphQlDto {
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
export class NivelFormacaoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("NivelFormacaoListResult"))
export class NivelFormacaoListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [NivelFormacaoFindOneOutputGraphQlDto]))
  data: NivelFormacaoFindOneOutputGraphQlDto[];
}
