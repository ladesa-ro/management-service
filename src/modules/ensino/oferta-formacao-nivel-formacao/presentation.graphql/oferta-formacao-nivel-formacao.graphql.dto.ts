import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { ArgsType, Field, InputType, ObjectType } from "@/modules/@shared/presentation/graphql";
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import { NivelFormacaoFindOneOutputGraphQlDto } from "@/modules/ensino/nivel-formacao/presentation.graphql/nivel-formacao.graphql.dto";
import { OfertaFormacaoFindOneOutputGraphQlDto } from "@/modules/ensino/oferta-formacao/presentation.graphql/oferta-formacao.graphql.dto";

// ============================================================================
// Ref Input DTOs for cross-module references
// ============================================================================

@InputType("OfertaFormacaoNivelFormacaoOfertaFormacaoRefInputDto")
export class OfertaFormacaoNivelFormacaoOfertaFormacaoRefInputGraphQlDto {
  @Field(() => String) @IsString() id: string;
}

@InputType("OfertaFormacaoNivelFormacaoNivelFormacaoRefInputDto")
export class OfertaFormacaoNivelFormacaoNivelFormacaoRefInputGraphQlDto {
  @Field(() => String) @IsString() id: string;
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
export class OfertaFormacaoNivelFormacaoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
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
