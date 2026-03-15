import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { ArgsType, Field, InputType, ObjectType } from "@/modules/@shared/presentation/graphql";
import { IsOptional, IsString, MinLength } from "@/modules/@shared/presentation/shared";
import { NivelFormacaoFieldsMixin } from "@/modules/ensino/nivel-formacao/presentation.validations/nivel-formacao.validation-mixin";

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
export class NivelFormacaoCreateInputGraphQlDto extends NivelFormacaoFieldsMixin {
  @Field(() => String) declare slug: string;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("NivelFormacaoUpdateInputDto")
export class NivelFormacaoUpdateInputGraphQlDto {
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
export class NivelFormacaoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {}

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
