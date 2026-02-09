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

@ObjectType("ModalidadeFindOneOutputDto")
export class ModalidadeFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() nome: string;
  @Field() slug: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("ModalidadeCreateInputDto")
export class ModalidadeCreateInputGraphQlDto {
  @Field() @IsString() @MinLength(1) nome: string;
  @Field() @IsString() @MinLength(1) slug: string;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("ModalidadeUpdateInputDto")
export class ModalidadeUpdateInputGraphQlDto {
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) nome?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) slug?: string;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class ModalidadeListInputGraphQlDto extends PaginationArgsGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];
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
