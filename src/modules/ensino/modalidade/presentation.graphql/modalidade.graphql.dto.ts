import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { ArgsType, Field, InputType, ObjectType } from "@/modules/@shared/presentation/graphql";
import { IsOptional, IsString, MinLength } from "@/modules/@shared/presentation/shared";
import { ModalidadeFieldsMixin } from "../presentation.validations/modalidade.validation-mixin";

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
export class ModalidadeCreateInputGraphQlDto extends ModalidadeFieldsMixin {
  @Field(() => String) declare nome: string;
  @Field(() => String) declare slug: string;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("ModalidadeUpdateInputDto")
export class ModalidadeUpdateInputGraphQlDto {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  nome?: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  slug?: string;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class ModalidadeListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {}

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
