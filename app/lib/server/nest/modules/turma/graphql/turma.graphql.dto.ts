import { ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString } from "class-validator";
import { PaginationGraphqlArgsDto } from "@/modules/@shared/infrastructure/graphql";
import { PaginationMetaDto } from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { TurmaFindOneOutputDto } from "../rest/turma.rest.dto";

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class TurmaListInputGqlDto extends PaginationGraphqlArgsDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterId?: string[];
}

// ============================================================================
// List Output (reuses the same output DTOs - they're already GraphQL-compatible)
// ============================================================================

@ObjectType("TurmaListResult")
export class TurmaListOutputGqlDto {
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @Field(() => [TurmaFindOneOutputDto])
  data: TurmaFindOneOutputDto[];
}

// ============================================================================
// Input DTOs for mutations
// ============================================================================

@ArgsType()
export class TurmaFindOneInputGqlDto {
  @Field(() => ID, { description: "Identificador do registro (uuid)" })
  @IsString()
  id: string;
}
