import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { PaginationArgsGraphQlDto } from "@/modules/@shared/infrastructure/graphql/dtos/pagination-graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("NivelFormacaoFindOneOutputDto")
export class NivelFormacaoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() slug: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("NivelFormacaoCreateInputDto")
export class NivelFormacaoCreateInputGraphQlDto {
  @Field() @IsString() @MinLength(1) slug: string;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("NivelFormacaoUpdateInputDto")
export class NivelFormacaoUpdateInputGraphQlDto {
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) slug?: string;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class NivelFormacaoListInputGraphQlDto extends PaginationArgsGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];
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
