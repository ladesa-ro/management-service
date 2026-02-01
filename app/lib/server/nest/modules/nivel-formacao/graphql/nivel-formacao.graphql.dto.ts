import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString } from "class-validator";
import { PaginationGraphqlArgsDto } from "@/modules/@shared/infrastructure/graphql";
import { PaginationMetaDto } from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { NivelFormacaoFindOneOutputDto } from "../rest/nivel-formacao.rest.dto";

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class NivelFormacaoListInputGqlDto extends PaginationGraphqlArgsDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterId?: string[];
}

// ============================================================================
// List Output (reuses the same output DTOs - they're already GraphQL-compatible)
// ============================================================================

@ObjectType("NivelFormacaoListResult")
export class NivelFormacaoListOutputGqlDto {
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @Field(() => [NivelFormacaoFindOneOutputDto])
  data: NivelFormacaoFindOneOutputDto[];
}
