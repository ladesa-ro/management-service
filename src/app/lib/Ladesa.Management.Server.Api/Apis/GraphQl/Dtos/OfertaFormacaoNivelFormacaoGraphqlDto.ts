import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Abstractions";
import { NivelFormacaoFindOneOutputGraphQlDto } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Dtos/NivelFormacaoGraphqlDto";
import { OfertaFormacaoFindOneOutputGraphQlDto } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Dtos/OfertaFormacaoGraphqlDto";

// ============================================================================
// Ref Input DTOs for cross-module references
// ============================================================================

@decorate(InputType("OfertaFormacaoNivelFormacaoOfertaFormacaoRefInputDto"))
export class OfertaFormacaoNivelFormacaoOfertaFormacaoRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("OfertaFormacaoNivelFormacaoNivelFormacaoRefInputDto"))
export class OfertaFormacaoNivelFormacaoNivelFormacaoRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("OfertaFormacaoNivelFormacaoFindOneOutputDto"))
export class OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => NivelFormacaoFindOneOutputGraphQlDto))
  nivelFormacao: NivelFormacaoFindOneOutputGraphQlDto;
  @decorate(Field(() => OfertaFormacaoFindOneOutputGraphQlDto))
  ofertaFormacao: OfertaFormacaoFindOneOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("OfertaFormacaoNivelFormacaoCreateInputDto"))
export class OfertaFormacaoNivelFormacaoCreateInputGraphQlDto {
  @decorate(Field(() => OfertaFormacaoNivelFormacaoOfertaFormacaoRefInputGraphQlDto))
  @decorate(ValidateNested())
  ofertaFormacao: OfertaFormacaoNivelFormacaoOfertaFormacaoRefInputGraphQlDto;
  @decorate(Field(() => OfertaFormacaoNivelFormacaoNivelFormacaoRefInputGraphQlDto))
  @decorate(ValidateNested())
  nivelFormacao: OfertaFormacaoNivelFormacaoNivelFormacaoRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("OfertaFormacaoNivelFormacaoUpdateInputDto"))
export class OfertaFormacaoNivelFormacaoUpdateInputGraphQlDto {
  @decorate(
    Field(() => OfertaFormacaoNivelFormacaoOfertaFormacaoRefInputGraphQlDto, { nullable: true }),
  )
  @decorate(IsOptional())
  @decorate(ValidateNested())
  ofertaFormacao?: OfertaFormacaoNivelFormacaoOfertaFormacaoRefInputGraphQlDto;
  @decorate(
    Field(() => OfertaFormacaoNivelFormacaoNivelFormacaoRefInputGraphQlDto, { nullable: true }),
  )
  @decorate(IsOptional())
  @decorate(ValidateNested())
  nivelFormacao?: OfertaFormacaoNivelFormacaoNivelFormacaoRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@decorate(ArgsType())
export class OfertaFormacaoNivelFormacaoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @decorate(
    Field(() => [String], { nullable: true, description: "Filtro por ID do Nivel de Formacao" }),
  )
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterNivelFormacaoId?: string[];

  @decorate(
    Field(() => [String], { nullable: true, description: "Filtro por ID da Oferta de Formacao" }),
  )
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterOfertaFormacaoId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("OfertaFormacaoNivelFormacaoListResult"))
export class OfertaFormacaoNivelFormacaoListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto]))
  data: OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto[];
}
