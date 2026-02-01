import { ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString } from "class-validator";
import { PaginationGraphqlArgsDto } from "@/modules/@shared/infrastructure/graphql";
import { PaginationMetaDto } from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { TurmaDisponibilidadeFindOneOutputDto } from "../rest/turma-disponibilidade.rest.dto";

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class TurmaDisponibilidadeListInputGqlDto extends PaginationGraphqlArgsDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterId?: string[];
}

// ============================================================================
// List Output (reuses the same output DTOs - they're already GraphQL-compatible)
// ============================================================================

@ObjectType("TurmaDisponibilidadeListResult")
export class TurmaDisponibilidadeListOutputGqlDto {
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @Field(() => [TurmaDisponibilidadeFindOneOutputDto])
  data: TurmaDisponibilidadeFindOneOutputDto[];
}

// ============================================================================
// Input DTOs for mutations
// ============================================================================

@ArgsType()
export class TurmaDisponibilidadeFindOneInputGqlDto {
  @Field(() => ID, { description: "Identificador do registro (uuid)" })
  @IsString()
  id: string;
}
