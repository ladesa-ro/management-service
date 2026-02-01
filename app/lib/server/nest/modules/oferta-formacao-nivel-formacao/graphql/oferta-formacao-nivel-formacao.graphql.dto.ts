import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString } from "class-validator";
import { PaginationGraphqlArgsDto } from "@/modules/@shared/infrastructure/graphql";
import { PaginationMetaDto } from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { OfertaFormacaoNivelFormacaoFindOneOutputDto } from "../rest/oferta-formacao-nivel-formacao.rest.dto";

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class OfertaFormacaoNivelFormacaoListInputGqlDto extends PaginationGraphqlArgsDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Nivel de Formacao" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterNivelFormacaoId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID da Oferta de Formacao" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterOfertaFormacaoId?: string[];
}

// ============================================================================
// List Output (reuses the same output DTOs - they're already GraphQL-compatible)
// ============================================================================

@ObjectType("OfertaFormacaoNivelFormacaoListResult")
export class OfertaFormacaoNivelFormacaoListOutputGqlDto {
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @Field(() => [OfertaFormacaoNivelFormacaoFindOneOutputDto])
  data: OfertaFormacaoNivelFormacaoFindOneOutputDto[];
}
