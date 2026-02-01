import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql";
import { IsArray, IsInt, IsOptional, IsString, Min } from "class-validator";
import { PaginationMetaDto } from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { CidadeFindOneOutputDto } from "../rest/cidade.rest.dto";

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class CidadeListInputGqlDto {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sortBy?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Estado" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterEstadoId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por nome do Estado" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterEstadoNome?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por sigla do Estado" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterEstadoSigla?: string[];
}

// ============================================================================
// List Output (reuses the same output DTOs - they're already GraphQL-compatible)
// ============================================================================

@ObjectType("CidadeListResult")
export class CidadeListOutputGqlDto {
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @Field(() => [CidadeFindOneOutputDto])
  data: CidadeFindOneOutputDto[];
}
