import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { PaginationArgsGraphQlDto } from "@/modules/@shared/infrastructure/graphql";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { NivelFormacaoFindOneOutputGraphQlDto } from "@/server/nest/modules/nivel-formacao/graphql/nivel-formacao.graphql.dto";
import { OfertaFormacaoFindOneOutputGraphQlDto } from "@/server/nest/modules/oferta-formacao/graphql/oferta-formacao.graphql.dto";

// ============================================================================
// Ref Input DTOs for cross-module references
// ============================================================================

@InputType("OfertaFormacaoNivelFormacaoOfertaFormacaoRefInputDto")
export class OfertaFormacaoNivelFormacaoOfertaFormacaoRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

@InputType("OfertaFormacaoNivelFormacaoNivelFormacaoRefInputDto")
export class OfertaFormacaoNivelFormacaoNivelFormacaoRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("OfertaFormacaoNivelFormacaoFindOneOutputDto")
export class OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => NivelFormacaoFindOneOutputGraphQlDto)
  nivelFormacao: NivelFormacaoFindOneOutputGraphQlDto;
  @Field(() => OfertaFormacaoFindOneOutputGraphQlDto)
  ofertaFormacao: OfertaFormacaoFindOneOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("OfertaFormacaoNivelFormacaoCreateInputDto")
export class OfertaFormacaoNivelFormacaoCreateInputGraphQlDto {
  @Field(() => OfertaFormacaoNivelFormacaoOfertaFormacaoRefInputGraphQlDto)
  @ValidateNested()
  ofertaFormacao: OfertaFormacaoNivelFormacaoOfertaFormacaoRefInputGraphQlDto;
  @Field(() => OfertaFormacaoNivelFormacaoNivelFormacaoRefInputGraphQlDto)
  @ValidateNested()
  nivelFormacao: OfertaFormacaoNivelFormacaoNivelFormacaoRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("OfertaFormacaoNivelFormacaoUpdateInputDto")
export class OfertaFormacaoNivelFormacaoUpdateInputGraphQlDto {
  @Field(() => OfertaFormacaoNivelFormacaoOfertaFormacaoRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  ofertaFormacao?: OfertaFormacaoNivelFormacaoOfertaFormacaoRefInputGraphQlDto;
  @Field(() => OfertaFormacaoNivelFormacaoNivelFormacaoRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  nivelFormacao?: OfertaFormacaoNivelFormacaoNivelFormacaoRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class OfertaFormacaoNivelFormacaoListInputGraphQlDto extends PaginationArgsGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Nivel de Formacao" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterNivelFormacaoId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID da Oferta de Formacao" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterOfertaFormacaoId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("OfertaFormacaoNivelFormacaoListResult")
export class OfertaFormacaoNivelFormacaoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto])
  data: OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto[];
}
