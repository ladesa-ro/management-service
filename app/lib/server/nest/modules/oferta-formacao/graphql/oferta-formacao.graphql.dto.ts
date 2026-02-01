import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString } from "class-validator";
import { PaginationGraphqlArgsDto } from "@/modules/@shared/infrastructure/graphql";
import { PaginationMetaDto } from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { OfertaFormacaoFindOneOutputDto } from "../rest/oferta-formacao.rest.dto";

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class OfertaFormacaoListInputGqlDto extends PaginationGraphqlArgsDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID da Modalidade" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterModalidadeId?: string[];
}

// ============================================================================
// List Output (reuses the same output DTOs - they're already GraphQL-compatible)
// ============================================================================

@ObjectType("OfertaFormacaoListResult")
export class OfertaFormacaoListOutputGqlDto {
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @Field(() => [OfertaFormacaoFindOneOutputDto])
  data: OfertaFormacaoFindOneOutputDto[];
}
